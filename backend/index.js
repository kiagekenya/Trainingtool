const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
// added
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const Content = require("./models/Content");

require("dotenv/config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// adding the static files
// app.use(express.static(path.join(__dirname, "frontend/build")));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kiagejay@gmail.com",
    pass: "ynsd mdzk apft ernd",
  },
});

app.post(
  "/upload-pdf",
  upload.fields([{ name: "pdf" }, { name: "invoice" }]),
  (req, res) => {
    try {
      const pdfFile = req.files["pdf"][0]; // Retrieve the uploaded PDF file
      const invoiceFile = req.files["invoice"][0]; // Retrieve the uploaded invoice file

      // Save the uploaded PDF file
      fs.writeFileSync("generated-pdf.pdf", pdfFile.buffer);

      // Save the uploaded invoice file
      fs.writeFileSync("payment-receipt", invoiceFile.buffer);

      res.status(200).json({ message: "PDF uploaded successfully" });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.post("/send-email", (req, res) => {
  const name = req.body.name;

  const mailOptions = {
    from: "kiagejay@gmail.com",
    to: "jacobkiage4@gmail.com",
    subject: `New Order for ${name}`,

    text: "New order received. Please find the attached  LPO and Payment receipt.",
    attachments: [
      {
        filename: "onlinelpo.pdf",
        content: fs.createReadStream("generated-pdf.pdf"),
      },
      {
        filename: "paymentreceipt.pdf",
        content: fs.createReadStream("payment-receipt"),
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// Fetch all contents
app.get("/api/contents", async (req, res) => {
  try {
    const contents = await Content.find({});
    res.json(contents);
  } catch (error) {
    console.error("Error fetching contents1:", error);
    res.status(500).json({ error: "Failed tob fetch contents" });
  }
});

// Fetch quiz content by ID
app.get("/api/quiz/:id", async (req, res) => {
  console.log("Received ID:", req.params.id);
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    console.error("Error fetching quiz content:", error);
    res.status(500).json({ error: "Failed to fetch quiz content" });
  }
});

// Submit quiz answers
app.post("/api/quiz/:id/results", upload.none(), async (req, res) => {
  try {
    // Retrieve content by ID
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Logging Inputs
    console.log("Received answers from user:", req.body);
    console.log(
      "Correct answers from database:",
      content.questions.map((question) => question.correctAnswer)
    );

    // Process quiz results and calculate score
    const userAnswers = Object.values(req.body);
    const correctAnswers = content.questions.map(
      (question) => question.correctAnswer
    );

    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (parseInt(userAnswers[i]) === correctAnswers[i]) {
        score++;
      }
    }

    // Calculate total questions
    const totalQuestions = correctAnswers.length;

    // Send back the results
    res.json({ score, totalQuestions });
  } catch (error) {
    console.error("Error processing quiz results:", error);
    res.status(500).json({ error: "Failed to process quiz results" });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://rben:zxc@cluster0.z2lt81m.mongodb.net/Training_tool",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json()); // This is required to parse JSON bodies

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("User saved successfully");
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).send("User registration failed");
  }
});

// Login route
// const express = require("express");
// const bcrypt = require("bcryptjs");
const session = require("express-session");

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: "auto", httpOnly: true },
  })
);

// const User = require("./models/User"); // Assuming this is your user model

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      status: "success",
      message: "Logged in successfully",
      name: user.name, // Include the user's name in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint to get user data
// Example route handler

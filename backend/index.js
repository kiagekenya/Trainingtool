require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/User");
const Content = require("./models/Content");
require("./models/passportConfig");

// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
const app = express();

// Middleware setup for google logic
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google Auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/", // Change this to where you want to redirect after successful login
  })
);

// logout

// Logout route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/login"); // Redirect to login page after logout
    });
  });
});

// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// adding the static files
// app.use(express.static(path.join(__dirname, "frontend/build")));

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "kiagejay@gmail.com",
//     pass: "ynsd mdzk apft ernd",
//   },
// });

// app.post(
//   "/upload-pdf",
//   upload.fields([{ name: "pdf" }, { name: "invoice" }]),
//   (req, res) => {
//     try {
//       const pdfFile = req.files["pdf"][0]; // Retrieve the uploaded PDF file
//       const invoiceFile = req.files["invoice"][0]; // Retrieve the uploaded invoice file

//       // Save the uploaded PDF file
//       fs.writeFileSync("generated-pdf.pdf", pdfFile.buffer);

//       // Save the uploaded invoice file
//       fs.writeFileSync("payment-receipt", invoiceFile.buffer);

//       res.status(200).json({ message: "PDF uploaded successfully" });
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// app.post("/send-email", (req, res) => {
//   const name = req.body.name;

//   const mailOptions = {
//     from: "kiagejay@gmail.com",
//     to: "jacobkiage4@gmail.com",
//     subject: `New Order for ${name}`,

//     text: "New order received. Please find the attached  LPO and Payment receipt.",
//     attachments: [
//       {
//         filename: "onlinelpo.pdf",
//         content: fs.createReadStream("generated-pdf.pdf"),
//       },
//       {
//         filename: "paymentreceipt.pdf",
//         content: fs.createReadStream("payment-receipt"),
//       },
//     ],
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Failed to send email" });
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).json({ message: "Email sent successfully" });
//     }
//   });
// });

// server.js or appropriate backend file

app.get("/api/user", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
}

// Protected route example
// app.get("/home", isAuthenticated, (req, res) => {
//   res.send("Home Page");
// });

// app.get("/introduction", isAuthenticated, (req, res) => {
//   res.send("Introduction");
// });

// app.get("/about", isAuthenticated, (req, res) => {
//   res.send("About");
// });

// app.get("/courses", isAuthenticated, (req, res) => {
//   res.send("Courses");
// });

// app.get("/teachers", isAuthenticated, (req, res) => {
//   res.send("Teachers");
// });

// app.get("/contact", isAuthenticated, (req, res) => {
//   res.send("Contact");
// });

// server.js or wherever your backend routes are defined
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

    req.session.user = {
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
    };

    res.json({
      status: "success",
      message: "Logged in successfully",
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-profile-image", upload.single("image"), async (req, res) => {
  const { email } = req.body;
  const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : null;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { imageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "success",
      message: "Profile image updated successfully",
      imageUrl: user.imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Registration endpoint
app.post("/register", upload.single("image"), async (req, res) => {
  const { name, email, password } = req.body;
  const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : null; // Ensure forward slashes

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      imageUrl,
    });
    await newUser.save();
    console.log("User saved successfully");
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).send("User registration failed");
  }
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

app.get("/api/userQuizData", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      completedQuizIds: user.quizResults.map((result) => result.quizId),
    });
  } catch (error) {
    console.error("Error fetching user quiz data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Submit quiz answers
// server.js or appropriate backend file

app.post("/api/quiz/:id/results", upload.none(), async (req, res) => {
  try {
    // Retrieve content by ID
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

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

    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Find the user by email
    const user = await User.findOne({ email: req.session.user.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's quiz results
    user.quizResults.push({
      quizId: content._id,
      score: score,
      totalQuestions: totalQuestions,
    });

    // Save the updated user document
    await user.save();

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

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.use(express.json()); // This is required to parse JSON bodies

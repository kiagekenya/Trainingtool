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

app.use(
  cors({
    origin: "https://nocklearning.co.ke", // Frontend main domain
    credentials: true,
    // Allow cookies/session to be sent
  })
);

// Middleware setup for google logic
app.use(
  session({
    secret: "My.SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: ".nocklearning.co.ke",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.get("/api/demo", (req, res) => {
  res.send("API demo is working");
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

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
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Could not log out, please try again" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

app.get("/api/user", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kiagejay@gmail.com",
    pass: "ynsd mdzk apft ernd",
  },
});

const storages = multer.memoryStorage();
const uploads = multer({ storage: storages });

app.post("/send-email", uploads.single("image"), (req, res) => {
  const { name, email, organisation, occupation } = req.body;
  const mailOptions = {
    from: "kiagejay@gmail.com",
    to: "jacobkiage4@gmail.com",
    cc: ["reubenmoses91@gmail.com", "pkwanjau@nockenya.co.ke"],
    subject: `New Registration from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation}\nOccupation: ${occupation}`,
    attachments: req.file
      ? [
          {
            filename: req.file.originalname,
            content: req.file.buffer,
          },
        ]
      : [],
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

//contact us logic

const transporters = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kiagejay@gmail.com",
    pass: "ynsd mdzk apft ernd",
  },
});

const storagess = multer.memoryStorage();
const uploadss = multer({ storage: storagess });

app.post("/send-emaiil", uploadss.single("image"), (req, res) => {
  const { name, email, number, msg } = req.body;
  const mailOptions = {
    from: "kiagejay@gmail.com",
    to: ["reubenmoses91@gmail.com", "pkwanjau@nockenya.co.ke"],
    subject: `New inWeb message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${msg}`,
    attachments: req.file
      ? [
          {
            filename: req.file.originalname,
            content: req.file.buffer,
          },
        ]
      : [],
  };

  transporters.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

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

// server.js or wherever your backend routes are defined
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email." });
    }

    const isMatch = password == user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
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

// Example endpoint in Express.js
app.post("/api/changePassword", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const isMatch = (await currentPassword) == user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password." });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(newPassword, salt);
    const hashedPassword = newPassword;

    user.password = hashedPassword;
    await user.save();

    res.json({ status: "success", message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
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

// Backend: API endpoint
app.post("/api/quiz/:id/results", upload.none(), async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

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
    console.log("User answers:", userAnswers);
    console.log("Correct answers:", correctAnswers);

    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (parseInt(userAnswers[i]) === correctAnswers[i]) {
        score++;
      }
    }
    console.log("Score:", score);

    // Calculate total questions
    const totalQuestions = correctAnswers.length;
    console.log("Total questions:", totalQuestions);

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User found:", user.email);

    // Update user's quiz results
    user.quizResults.push({
      quizId: content._id,
      score: score,
      totalQuestions: totalQuestions,
    });

    // Save the updated user document
    await user.save();
    console.log("Updated user quiz results saved");

    // Send back the results
    console.log("Sending response:", { score, totalQuestions });
    res.json({ score, totalQuestions });
  } catch (error) {
    console.error("Error processing quiz results:", error);
    res.status(500).json({ error: "Failed to process quiz results" });
  }
});

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

// Read MongoDB URI from environment variables
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://doadmin:37w10A9MqeJ84h6F@training-tool-db-862a20d2.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=training-tool-db";
// "mongodb+srv://rben:zxc@cluster0.z2lt81m.mongodb.net/Training_tool";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json()); // This is required to parse JSON bodies

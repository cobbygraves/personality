const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoMemoryServer } = require("mongodb-memory-server");
const path = require("path");
dotenv.config();

const server = express();

server.use(express.json({ limit: "200mb", extended: true }));
server.use(express.urlencoded({ limit: "200mb", extended: true }));
server.use(cors());
server.use(express.static(path.join(__dirname, "client", "build")));

//function to connect to in-memory server
const dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(uri + "personality", mongooseOpts);
};

//ADMIN ROUTES
const { getAdminUser, createAdminUser } = require("./controllers/adminUser");
server.post("/admin/login", getAdminUser);
server.post("/admin/create", createAdminUser);

//QUESTION ROUTES
const verifyToken = require("./middlewares/verifyToken");
const {
  readQuestion,
  updateQuestion,
  addQuestion,
  deleteQuestion,
  togglePublish,
  getQuestion,
} = require("./controllers/question");
server.get("/question", readQuestion);
server.delete("/question/:id", verifyToken, deleteQuestion);
server.post("/question/create", verifyToken, addQuestion);
server.get("/question/:id", verifyToken, getQuestion);
server.put("/question/update", verifyToken, updateQuestion);
server.put("/question/publish", verifyToken, togglePublish);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

dbConnect()
  .then((res) => {
    server.listen(PORT, (err) => {
      if (!err) {
        console.log("Server running...");
      } else {
        console.log("Error Connecting To Server");
      }
    });
  })
  .catch((err) => {
    console.log("Error connecting to database...");
  });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoMemoryServer } = require("mongodb-memory-server");

//function to connect to in-memory server
const dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri + "personality", mongooseOpts);
};

dotenv.config();

const adminUserRoute = require("./routes/adminUser");
const questionRoute = require("./routes/question");

const server = express();

server.use(express.json({ limit: "200mb", extended: true }));
server.use(express.urlencoded({ limit: "200mb", extended: true }));
server.use(cors());

server.use("/admin", adminUserRoute);
server.use("/question", questionRoute);

server.use(express.static(path.join(__dirname, "client", "build")));

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

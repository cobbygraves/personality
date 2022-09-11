const { getAdminUser, createAdminUser } = require("../controllers/adminUser");
const express = require("express");

const adminUser = express.Router();

adminUser.post("/login", getAdminUser);
adminUser.post("/create", createAdminUser);

module.exports = adminUser;

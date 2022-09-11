const AdminUserModel = require("../models/adminUser.js");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

//function to check if email exist
const checkEmail = async (email) => {
  let existingEmail;
  try {
    existingEmail = await AdminUserModel.findOne({
      email: email,
    });
  } catch (error) {
    return next(createError(400, error));
  }
  return existingEmail;
};

//logic to get user
const getAdminUser = async (req, res, next) => {
  const adminUser = req.body;

  let existingAdminUser = await checkEmail(adminUser.email);
  if (existingAdminUser) {
    bcrypt
      .compare(adminUser.password, existingAdminUser.password)
      .then((resp) => {
        if (resp) {
          // generating a token for the varified user
          jwt.sign(
            { id: existingAdminUser.id, email: existingAdminUser.email },
            "C0DESCRIPT",
            { expiresIn: "30m" },
            (err, token) => {
              if (!err) {
                return res.status(200).json({
                  id: existingAdminUser.id,
                  email: existingAdminUser.email,
                  token,
                  verification: true,
                });
              }
            }
          );
        } else {
          return res.json({ message: "wrong password", verification: false });
        }
      })
      .catch((err) => console.log(err));
  } else {
    return res.json({ message: "email does not exist", verification: false });
  }
};

//logic to create a user
const createAdminUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (password.trim().length < 8) {
    return res.json(
      createError(500, { message: "bad request", verification: false })
    );
    //  return res.status(500).send()
  }
  const emailExist = await checkEmail(email);
  if (emailExist) {
    return res.json({ message: "email already exist", verification: false });
  }
  const id = uuid.v4();
  bcrypt.hash(password, 10, (err, hashpwd) => {
    if (!err) {
      const adminUser = { id, email, password: hashpwd };
      const adminUserDocument = new AdminUserModel(adminUser);

      adminUserDocument.save((err) => {
        if (err) {
          return next(createError(400, error));
        }

        jwt.sign(
          { id, email },
          "C0DESCRIPT",
          { expiresIn: "30m" },
          (err, token) => {
            if (!err) {
              return res.status(200).json({
                id,
                email,
                token,
                verification: true,
              });
            }
          }
        );
      });
    }
  });
};

module.exports = { getAdminUser, createAdminUser };

const db = require("../models");
const secret = require("../../configs/secret.config");
const crypto = require('crypto');
const dayjs = require('dayjs');

const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  let user = req.body;
  if (!user.name || !user.email || !user.pass) {
    res.status(400).send({
      type: "warning",
      title: "Warning",
      message: "All fields are required.!"
    });
    return;
  }

  User.findAll({ where: { email: user.email } })
    .then(users => {
      if (users.length == 0) {

        user = {
          ...user,
          pass: crypto.createHmac('sha256', secret.HASH_SECRET).update(req.body.pass).digest('hex')
        }

        User.create(user)
          .then(data => {
            res.send(data);
          }).catch(err => {
            res.status(500).send({
              type: "warning",
              title: "Warning",
              message: "Some error occurred while creating the User."
            });
          });

      }
      else {
        res.status(500).send({
          type: "warning",
          title: "Warning",
          message: "User already exists with this email!"
        });
      }
    }).catch(err => {
      res.status(500).send({
        type: "error",
        title: "error",
        message: "Not working!"
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          type: "error",
          title: "error",
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        type: "warning",
        title: "Warning",
        message: "Error retrieving User with id=" + id
      });
    });
};

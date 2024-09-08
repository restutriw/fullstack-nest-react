const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const model = require("../models");
const Customer = model.customer;
const Op = db.Sequalize.Op;

exports.create = (req, res) => {

  const customer = {
    no: uuidv4(),
    nama: req.body.nama,
    alamat: req.body.alamat,
    kota: req.body.kota
  };

  Customer.create(customer)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });

};

exports.findAll = (req, res) => {

  Customer.findAll()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Customer."
      });
    });

};

exports.findOne = (req, res) => {

  const id = req.params.id;

  Customer.findByPk(id)
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(400).send({
        message:
          "Error retrieving Customer with id=" + id
      });
    });

};

exports.update = (req, res) => {

  const id = req.params.id;

  Customer.update(req.body, { where: { id: id } })
    .then((data) => {
      if (data[0] === 1) {
        res.send("Successfully updated Customer with id " + id);
      } else {
        res.send("Cannot update Customer with id " + id);
      }
    }).catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });

};

exports.delete = (req, res) => {

  const id = req.params.id;

  Customer.destroy({ where: { id: id } })
    .then((data) => {
      if (data === 1) {
        res.send("Successfully deleted Customer with id " + id);
      } else {
        res.send("Cannot delete Customer with id " + id);
      }
    }).catch((err) => {
      res.status(500).send({
        message: "Error deleting Customer with id=" + id
      });
    });

};
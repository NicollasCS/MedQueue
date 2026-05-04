// ===============================
// src/controllers/patient_controller.js
// ===============================
const Patient = require("../models/patient");

module.exports = {

  async create(req, res) {
    try {
      const patient = await Patient.create(req.body);
      res.status(201).json(patient);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async list(req, res) {
    const patients = await Patient.findAll();
    res.json(patients);
  },

  async update(req, res) {
    await Patient.update(req.body, {
      where: { id: req.params.id }
    });

    res.json({ msg: "Atualizado" });
  },

  async delete(req, res) {
    await Patient.destroy({
      where: { id: req.params.id }
    });

    res.json({ msg: "Removido" });
  }

};
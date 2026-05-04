// ===============================
// src/controllers/attendance_controller.js
// ===============================
const Attendance = require("../models/attendance");
const Patient = require("../models/patient");

module.exports = {

  async create(req, res) {
    try {
      const atendimento = await Attendance.create({
        prioridade: req.body.prioridade,
        PatientId: req.body.patient_id
      });

      res.status(201).json(atendimento);

    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async list(req, res) {
    const fila = await Attendance.findAll({
      where: { status: "AGUARDANDO" },
      include: Patient,
      order: [
        ["prioridade", "ASC"],
        ["createdAt", "ASC"]
      ]
    });

    res.json(fila);
  },

  async next(req, res) {
    const proximo = await Attendance.findOne({
      where: { status: "AGUARDANDO" },
      order: [
        ["prioridade", "ASC"],
        ["createdAt", "ASC"]
      ]
    });

    if (!proximo) {
      return res.status(404).json({
        erro: "Fila vazia"
      });
    }

    proximo.status = "EM_ATENDIMENTO";
    await proximo.save();

    res.json(proximo);
  }

};
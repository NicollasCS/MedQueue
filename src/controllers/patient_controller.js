const Patient = require('../models/patient');

class PatientController {
  static async index(req, res) {
    try {
      const patients = await Patient.findAll();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { nome, cpf, data_nascimento, telefone } = req.body;

      // Validações
      if (!nome || !cpf || !data_nascimento) {
        return res.status(400).json({
          message: 'Campos obrigatórios: nome, cpf, data_nascimento',
        });
      }

      // Verificar CPF único
      const existingPatient = await Patient.findOne({ where: { cpf } });
      if (existingPatient) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
      }

      const patient = await Patient.create({
        nome,
        cpf,
        data_nascimento,
        telefone,
      });

      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, data_nascimento, telefone } = req.body;

      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      if (nome !== undefined) patient.nome = nome;
      if (data_nascimento !== undefined) patient.data_nascimento = data_nascimento;
      if (telefone !== undefined) patient.telefone = telefone;

      await patient.save();
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      await patient.destroy();
      res.status(200).json({ message: 'Paciente removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PatientController;
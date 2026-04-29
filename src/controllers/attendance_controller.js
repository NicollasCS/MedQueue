const Attendance = require('../models/attendance');
const Patient = require('../models/patient');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

class AttendanceController {
  // Iniciar triagem (entrada na fila)
  static async create(req, res) {
    try {
      const { patientId, prioridade } = req.body;

      if (!patientId || !prioridade) {
        return res.status(400).json({
          message: 'Campos obrigatórios: patientId, prioridade',
        });
      }

      if (prioridade < 1 || prioridade > 5) {
        return res.status(400).json({
          message: 'Prioridade deve ser entre 1 e 5',
        });
      }

      // Verificar se paciente existe
      const patient = await Patient.findByPk(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      // Verificar se paciente já está em atendimento
      const existingAttendance = await Attendance.findOne({
        where: {
          patientId,
          status: { [Op.in]: ['Aguardando', 'Em Atendimento'] },
        },
      });

      if (existingAttendance) {
        return res.status(400).json({
          message: 'Paciente já possui um atendimento em andamento',
        });
      }

      const attendance = await Attendance.create({
        patientId,
        prioridade,
      });

      // Retornar com dados do paciente
      const result = await Attendance.findByPk(attendance.id, {
        include: [{ model: Patient }],
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Listar fila de espera
  static async queue(req, res) {
    try {
      const queue = await Attendance.findAll({
        where: { status: 'Aguardando' },
        include: [{ model: Patient }],
        order: [
          ['prioridade', 'ASC'],
          ['data_entrada', 'ASC'],
        ],
      });

      res.status(200).json(queue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Chamar próximo paciente
  static async callNext(req, res) {
    try {
      // Buscar o próximo paciente na fila
      const nextAttendance = await Attendance.findOne({
        where: { status: 'Aguardando' },
        include: [{ model: Patient }],
        order: [
          ['prioridade', 'ASC'],
          ['data_entrada', 'ASC'],
        ],
      });

      if (!nextAttendance) {
        return res.status(404).json({ message: 'Fila vazia' });
      }

      // Atualizar status
      nextAttendance.status = 'Em Atendimento';
      nextAttendance.data_atendimento = new Date();
      await nextAttendance.save();

      res.status(200).json({
        message: 'Próximo paciente chamado',
        attendance: nextAttendance,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Finalizar atendimento
  static async finish(req, res) {
    try {
      const { id } = req.params;
      const attendance = await Attendance.findByPk(id);

      if (!attendance) {
        return res.status(404).json({ message: 'Atendimento não encontrado' });
      }

      if (attendance.status !== 'Em Atendimento') {
        return res.status(400).json({
          message: 'Somente atendimentos em andamento podem ser finalizados',
        });
      }

      attendance.status = 'Finalizado';
      attendance.data_finalizacao = new Date();
      await attendance.save();

      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Histórico do dia
  static async history(req, res) {
    try {
      const { data } = req.query;
      const targetDate = data ? new Date(data) : new Date();
      
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      const attendances = await Attendance.findAll({
        where: {
          createdAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
          status: 'Finalizado',
        },
        include: [{ model: Patient }],
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(attendances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AttendanceController;
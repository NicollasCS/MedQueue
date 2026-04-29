const Ingrediente = require('../models/ingrediente');

class IngredienteController {
  static async index(req, res) {
    const ingredientes = await Ingrediente.findAll({});

    res.status(200).json(ingredientes);
  }
  static async show(req, res) {
    const { id } = req.params;
    const ingrediente = await Ingrediente.findByPk(id);

    res.status(ingrediente == null ? 404 : 200).json(ingrediente || {});
  }
  static async create(req, res) {
    const { quantidade, nome } = req.body;
    let ingrediente = await Ingrediente.create({ quantidade, nome });
    await ingrediente.save();

    res.status(200).json(ingrediente);
  }
  static async update(req, res) {
    const { id } = req.params;
    const { quantidade, nome } = req.body;
    let ingrediente = await Ingrediente.findByPk(id);

    if (ingrediente == null) {
      res.status(404).json({});
      return;
    }

    if (quantidade !== undefined) ingrediente.quantidade = quantidade;
    if (nome !== undefined) ingrediente.nome = nome;

    await ingrediente.save();

    res.status(200).json(ingrediente);
  }
  static async delete(req, res) {
    const { id } = req.params;
    let ingrediente = await Ingrediente.findByPk(id);

    ingrediente.destroy();
    res.status(200).json({});
  }
}

module.exports = IngredienteController;

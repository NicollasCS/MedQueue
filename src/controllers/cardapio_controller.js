const Cardapio = require('../models/cardapio');
const Ingrediente = require('../models/ingrediente');

class CardapioController {
  static async index(req, res) {
    const cardapios = await Cardapio.findAll({});

    res.status(200).json(cardapios);
  }
  static async show(req, res) {
    const { id } = req.params;
    const cardapio = await Cardapio.findByPk(id);

    res.status(cardapio == null ? 404 : 200).json(cardapio || {});
  }
  static async create(req, res) {
    const { descricao, preco, nome, categoria, ingredientes } = req.body;
    let cardapio = await Cardapio.create({ descricao, preco, nome, categoria });
    await cardapio.save();

    const CardapioIngrediente = require('../models/cardapio_ingrediente')

    for (let i = 0; i < ingredientes.length; i += 1){
      let ci = await CardapioIngrediente.create({
        cardapioId: cardapio.id,
        ingredienteId: ingredientes[i]
      })

      await ci.save()
    }

    res.status(200).json(cardapio);
  }
  static async update(req, res) {
    const { id } = req.params;
    const { descricao, preco, nome, categoria } = req.body;
    let cardapio = await Cardapio.findByPk(id);

    if (cardapio == null) {
      res.status(404).json({});
      return;
    }

    if (descricao !== undefined) cardapio.descricao = descricao;
    if (preco !== undefined) cardapio.preco = preco;
    if (nome !== undefined) cardapio.nome = nome;
    if (categoria !== undefined) cardapio.categoria = categoria;

    await cardapio.save();

    res.status(200).json(cardapio);
  }
  static async delete(req, res) {
    const { id } = req.params;
    let cardapio = await Cardapio.findByPk(id);

    cardapio.destroy();
    res.status(200).json({});
  }
}

module.exports = CardapioController;

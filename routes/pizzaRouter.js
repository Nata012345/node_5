const express = require('express');
const router = express.Router();

module.exports = (bd) => {
    router.post('/', async ({body}, res) => {
        try {
           const pizza = await bd.pizzas.create(body);
           res.json(pizza);
        } catch(err) {
            res.status(500).send(err);
        }
    })
    router.get('/', async (req, res) => {
        try {
          const pizzas = await  bd.pizzas.findAndCountAll();
          res.json(pizzas);
        } catch(err) {
            res.status(500).send(err);
        }
    })
    router.get('/:id', async ({params}, res) => {
        try {
            const pizza = await bd.pizzas.findOne({
                where: {
                    id: params.id,
                }
            })
            res.json(pizza);
        } catch(err) {
            res.status(500).send(err);
        }
    })
    router.put('/:id', async ({body, params}, res) => {
        try {
            const pizza = await bd.pizzas.update(body, {
                where: {
                    id: params.id,
                }
            })
            res.json(pizza);
        } catch(err) {
            res.status(500).send(err);
        }
    })
    router.delete('/:id', async ({params}, res) => {
        try {
            const pizza = await bd.pizzas.destroy({
                where: {
                    id: params.id,
                }
            })
            res.json(pizza);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    return router;
}
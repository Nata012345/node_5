const express = require('express');
const router = express.Router();

module.exports = (bd) => {
    router.post('/', async ({body}, res) => {
        try {
            const turtles = await bd.turtles.create(body);
            res.json(turtles);
        } catch (err) {
            res.status(500).send(err);
        }
    });
    router.get('/', async (req, res) => {
        try {
            const turtles = await bd.turtles.findAndCountAll();
            res.json(turtles);
        } catch (err) {
            res.status(404).send(err);
        }
    });
    router.get('/:id', async ({params}, res) => {
        try {
            const turtle = await bd.turtles.findOne({
                where: {
                    id: params.id,
                },
            })
            res.json(turtle);
        } catch (err) {
            res.status(404).send(err);
        }
    });
    router.put('/:id', async ({body, params}, res) => {
        try {
            const turtle = await bd.turtles.update(body, {
                where: {
                    id: params.id,
                }
            })
            res.json(turtle);
        } catch (err) {
            res.status(404).send(err);
        }
    });
    router.delete('/:id', async ({params}, res) => {
        try {
            const turtle = await bd.turtles.destroy({
                where: {
                    id: params.id,
                }
            })
            res.json(turtle);
        } catch (err) {
            res.status(404).send(err);
        }
    })
    return router;
}


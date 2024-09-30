const express = require('express');
const {raw} = require("mysql2");
const router = express.Router();

module.exports = (bd) => {
    router.post('/', async ({body}, res) => {
        try {
            const weapon = await bd.weapons.create(body);
            res.json(weapon);
        } catch(err) {
            res.status(500).send(err);
        }
    })
    router.get('/', async (req, res) => {
        try {
            const weapons = await bd.weapons.findAndCountAll();
            res.json(weapons);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    router.get('/:id', async ({params}, res) => {
        try {
            const weapon = await bd.weapons.findOne({
                where: {
                    id: params.id,
                }
            })
            res.json(weapon);
        } catch (err) {
            res.status(404).send(err);
        }
    })
    router.put('/:id', async ({body, params}, res) => {
        try {
            const weapon = await bd.weapons.update(body, {
                where: {
                    id: params.id,
                }
            })
            res.json(weapon);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    router.delete('/:id', async ({params}, res) => {
        try {
            const weapon = await bd.weapons.destroy({
                where: {
                    id: params.id
                }
            })
            res.json(weapon);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    return router;
}
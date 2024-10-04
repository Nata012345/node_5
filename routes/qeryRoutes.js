const express = require('express');
const router = express.Router();
const helpers = require('../helpers/helper');

module.exports = (bd) => {
    router.get('/getAllTurtles', async(req, res) => {
        try {
            const turtles = await helpers.getAllTurtles(bd);
            res.json(turtles);
        } catch (err) {
            res.status(404).send(err);
        }
    })
    router.get('/turtlesWithFavoritePizza', async(req, res) => {
        try {
            const turtles = await helpers.getTurtlesWithFavoritePizza(bd, 'Mozzarella');
            if (!turtles.length) {
                res.status(404).send('Not found');
            }
            res.json(turtles);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    router.put('/updatePizzasSuperFat', async (req, res) => {
        try {
            const pizzas = await helpers.updatePizzasSuperFat(bd);
            res.json(pizzas);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    router.get('/getAllFavoritePizzasWithoutRepeat', async (req, res) => {
        try {
            const pizzas = await helpers.getAllFavoritePizzasWithoutRepeat(bd);
            res.json(pizzas);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    router.get('/getNumberOfWeapons', async (req, res) => {
        try {
            const numberOfWeapons = await helpers.getNumberOfWeapons(bd);
            res.json(numberOfWeapons);
        } catch (err) {
            res.status(500).send(err);
        }
    })

    return router;
}


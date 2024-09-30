const Sequelize = require('sequelize');
const express  =  require('express');

const initPizza = require('./models/data/initialPizza');
const initWeapon = require('./models/data/initialWeapon');
const initTurtle = require('./models/data/initialTurtle');
// const { initializeData, readData } = require('./helpers/helper');

const config = require('./config.json');
const bd = require('./models')(Sequelize, config);

const app = express();
app.use(express.json());

const turtleRoutes = require('./routes/turtleRoutes')(bd);
const weaponRoutes = require('./routes/weaponRoutes')(bd);
const pizzaRoutes = require('./routes/pizzaRouter')(bd);
bd.sequelize.sync()
    .then(async () => {
        console.log('connect to bd');
        app.listen(3000, () => console.log('server started'))
        try {
            const weaponCount = await bd.weapons.count();
            if (weaponCount === 0) {
                await Promise.all(initWeapon.map(weapon => bd.weapons.create(weapon)));
                console.log('Weapons added successfully');
            }  else {
                console.log('Weapons already existed');
            }

            const pizzaCount = await bd.pizzas.count();
            if (pizzaCount === 0) {
                await Promise.all(initPizza.map(pizza => bd.pizzas.create(pizza)));
                console.log('Pizzas added successfully');
            } else {
                console.log('Pizzas already existed');
            }

            const turtleCount = await bd.turtles.count();
            if (turtleCount === 0) {
                await Promise.all(initTurtle.map(turtle => bd.turtles.create(turtle)));
                console.log('Turtles added successfully');
            } else {
                console.log('Turtles already existed');
            }
        } catch (err) {
            console.error('Error adding initial data:', err);
        }
        app.use('/api/pizzas', pizzaRoutes);
        app.use('/api/weapons', weaponRoutes);
        app.use('/api/turtles', turtleRoutes);
    })
    .catch((err) => console.log('error', err));
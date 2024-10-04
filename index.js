const Sequelize = require('sequelize');
const express  =  require('express');

const initPizza = require('./models/data/initialPizza');
const initWeapon = require('./models/data/initialWeapon');
const initTurtle = require('./models/data/initialTurtle');
// const { getAllTurtles,
//     getTurtlesWithFavoritePizza,
//     getAllFavoritePizzasWithoutRepeat,
//     addTurtle,
//     updatePizzasSuperFat,
//     getNumberOfWeapons,
//     getPizzaWithId,
//     addTurtleFavoritePizza } = require('./helpers/helper');

const config = require('./config.json');
const bd = require('./models')(Sequelize, config);

const app = express();
app.use(express.json());

const turtleRoutes = require('./routes/turtleRoutes')(bd);
const weaponRoutes = require('./routes/weaponRoutes')(bd);
const pizzaRoutes = require('./routes/pizzaRouter')(bd);
const qeryRoutes = require('./routes/qeryRoutes')(bd);

const seedDatabase = async () => {
    try {
        await bd.weapons.bulkCreate(initWeapon);

        await bd.pizzas.bulkCreate(initPizza);

        await bd.turtles.bulkCreate(initTurtle);

        console.log('Init db success');
    } catch (error) {
        console.error('Init db Error:', error);
    }
};

bd.sequelize.sync({ force: true })
    .then(async () => {
        console.log('connect to bd');
        app.listen(3000, () => console.log('server started'))
        try {
            await seedDatabase();
        } catch (err) {
            console.error('Error adding initial data:', err);
        }
        app.use('/api/pizzas', pizzaRoutes);
        app.use('/api/weapons', weaponRoutes);
        app.use('/api/turtles', turtleRoutes);
        app.use('/api/', qeryRoutes);


    })
    .catch((err) => console.log('error', err));
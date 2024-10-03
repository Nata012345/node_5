const {Sequelize, Op } = require("sequelize");
const readWeapons = async () => {
    try {
        const weapon = await bd.weapons.findAll(); // Предполагается, что Weapon - это ваша модель
        console.log("Weapons retrieved successfully:", weapon);
    } catch (err) {
        console.error("Error retrieving weapons:", err);
    }
};
const readPizzas = async () => {
    try {
        const pizza = await bd.pizzas.findAll();
        console.log("Pizzas retrieved successfully:", pizza)
    } catch (err) {
        console.error("Error retrieving pizzas:", err);
    }
}
const readTurtles = async () => {
    try {
        const turtle = await bd.turtles.findAll();
        console.log("Turtles retrieved successfully:", turtle);
    } catch (err) {
        console.error("Error retrieving turtles:", err);
    }
}
const getAllTurtles = async () => {
    try {
        const turtles = await bd.turtles.findAll();
        console.log(turtles);
    }catch (err) {
        console.error(err);
    }
}
const getTurtlesWithFavoritePizza = async () => {
    try {
        const turtles = await bd.turtles.findAll({
             include: [
                 {
                     model: bd.pizzas,
                     where: {
                         name: 'Mozzarella',
                     },
                 },
             ],
         });
        console.log(turtles);
     } catch (err) {
        console.error(err);
     }
}
const getAllFavoritePizzasWithoutRepeat = async () => {
    try {
        const pizzas = await bd.pizzas.findAll({
            include: [
                {
                    model: bd.turtles,
                    as: 'firstFavoritePizza',
                    attributes: [],
                },
                {
                    model: bd.turtles,
                    as: 'secondFavoritePizza',
                    attributes: [],
                }
            ],
            attributes: ['name'],
            distinct: true,
        });
        console.log(pizzas);
    } catch (err) {
        console.error(err);
    }
}
const myTurtle = {
    name: 'Natallia',
    color: 'purple',
    weaponId: 1,
}
const addTurtle = async (myTurtle) => {
    try {
        const newTurtle = await bd.turtles.create(myTurtle);
        console.log(newTurtle);
    } catch (err) {
        console.error(err);
    }
}
const updatePizzasSuperFat = async()=> {
    try {
        const pizzasWithSuperFat = await bd.pizzas.update({
            discription: Sequelize.fn('concat', Sequelize.col('discription'), 'SUPER FAT!')
        },
            {
                where: {
                    calories: {
                        [Sequelize.Op.gt]: 3000,
                    }
                }
            }
        )
        console.log(pizzasWithSuperFat);
    } catch (err) {
        console.error(err);
    }
}
const getNumberOfWeapons = async () => {
    try {
        const weapons = await bd.weapons.count({
            where: {
                dps: {
                    [Sequelize.Op.gt]: 100,
                }
            }
        })
        console.log(weapons);
    } catch (err) {
        console.error(err);
    }
}
const getPizzaWithId = async (id) => {
    try {
        const pizzaId = await bd.pizzas.findOne({
            where: {
                id: id,
            }
        })
        console.log(pizzaId)
    } catch (err) {
        console.error(err);
    }
}
const addTurtleFavoritePizza = async (turtleId,favoritePizzaId ) => {
    try {
        const turtle = await bd.turtles.findOne({
            where: {
                id: turtleId,
            }
        })
        if (!turtle) {
            console.log(`there is no turtle with id ${turtleId}`);
            return;
        }
        const pizza = await bd.pizzas.findOne({
            where: {
                id: favoritePizzaId,
            }
        })
        if (!pizza) {
            console.log(`there is no pizza with id ${favoritePizzaId}`)
            return;
        }
        const turtleWithFavoritePizza = await turtle.addPizza(pizza);
        console.log(turtleWithFavoritePizza);
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllTurtles,
    getTurtlesWithFavoritePizza,
    getAllFavoritePizzasWithoutRepeat,
    addTurtle,
    updatePizzasSuperFat,
    getNumberOfWeapons,
    getPizzaWithId,
    addTurtleFavoritePizza,
    // readPizzas,
    // readWeapons,
    // readTurtles,
}

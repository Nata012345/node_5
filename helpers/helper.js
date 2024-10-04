const {Sequelize, Op } = require("sequelize");
const  bd = require('../models');

const getAllTurtles = async (bd) => {
    try {
        const turtles = await bd.turtles.findAll({
            attributes: ['id', 'name', 'color'],
            include: [
                {
                    model: bd.weapons,
                    as: 'weapon',
                    attributes: ['name'],
                },
                {
                    model: bd.pizzas,
                    as: 'firstFavoritePizza',
                    attributes: ['name'],
                },
                {
                    model: bd.pizzas,
                    as: 'secondFavoritePizza',
                    attributes: ['name'],
                },
            ]
        });
        return turtles
    }catch (err) {
        return 'err'
    }
}
// const readWeapons = async () => {
//     try {
//         const weapon = await bd.weapons.findAll(); // Предполагается, что Weapon - это ваша модель
//         console.log("Weapons retrieved successfully:", weapon);
//     } catch (err) {
//         console.error("Error retrieving weapons:", err);
//     }
// };
// const readPizzas = async () => {
//     try {
//         const pizza = await bd.pizzas.findAll();
//         console.log("Pizzas retrieved successfully:", pizza)
//     } catch (err) {
//         console.error("Error retrieving pizzas:", err);
//     }
// }
// const readTurtles = async () => {
//     try {
//         const turtle = await bd.turtles.findAll();
//         console.log("Turtles retrieved successfully:", turtle);
//     } catch (err) {
//         console.error("Error retrieving turtles:", err);
//     }
// }

const getTurtlesWithFavoritePizza = async (bd, pizzaName) => {
    try {
        const turtles = await bd.turtles.findAll({
            attributes: ['id', 'name', 'color'],
            include: [
                {
                    model: bd.weapons,
                    as: 'weapon',
                    attributes: ['name'],
                },
                {
                    model: bd.pizzas,
                    as: 'firstFavoritePizza',
                    attributes: ['name'],
                    required: true,
                },
                {
                    model: bd.pizzas,
                    as: 'secondFavoritePizza',
                    attributes: ['name'],
                    required: true,
                },
            ],
            where: {
                [Op.or]: [
                    { '$firstFavoritePizza.name$': pizzaName },
                    { '$secondFavoritePizza.name$': pizzaName },
                ],
            },
         });
        return turtles;
     } catch (err) {
        return err
     }
}
const getAllFavoritePizzasWithoutRepeat = async (bd) => {
    try {
        const pizzas = await bd.pizzas.findAll({
            include: [
                {
                    model: bd.turtles,
                    as: 'firstFavoriteTurtles',
                    attributes: [],
                },
                {
                    model: bd.turtles,
                    as: 'secondFavoriteTurtles',
                    attributes: [],
                }
            ],
            attributes: ['name'],
            distinct: true,
        });
        return pizzas;
    } catch (err) {
        return err;
    }
}
const updatePizzasSuperFat = async(bd) => {
    try {
        const pizzasWithSuperFat = await bd.pizzas.update({
                description: Sequelize.fn('concat', Sequelize.col('description'), 'SUPER FAT!')
        },
            {
                where: {
                    calories: {
                        [Sequelize.Op.gt]: 3000,
                    }
                }
            }
        )
        return pizzasWithSuperFat;
    } catch (err) {
        return err;
    }
}
const getNumberOfWeapons = async (bd) => {
    try {
        const weapons = await bd.weapons.count({
            where: {
                dps: {
                    [Sequelize.Op.gt]: 85,
                }
            }
        })
        console.log(weapons);
        return weapons;
    } catch (err) {
        return err;
    }
}
const getPizzaWithId = async (id) => {
    try {
        const pizzaId = await bd.pizzas.findOne({
            where: {
                id: id,
            }
        })
        return pizzaId;
    } catch (err) {
        return err;
    }
}
const addTurtleFavoritePizza = async (turtleId, favoritePizzaId, body) => {
    try {
        const turtle = await bd.turtles.findOne({
            where: {
                id: turtleId,
            }
        })
        console.log(turtle);
        if (!turtle) {
            console.log(`there is no turtle with id ${turtleId}`);
            return;
        }
        const pizza = await bd.pizzas.findOne({
            where: {
                id: favoritePizzaId,
            }
        })
        console.log(pizza);
        if (!pizza) {
            console.log(`there is no pizza with id ${favoritePizzaId}`)
            return;
        }
        const turtleWithFavoritePizza = await turtle.update(pizza);
        return turtleWithFavoritePizza;
    } catch(err){
        return err;
    }
}

module.exports = {
    getAllTurtles,
    getTurtlesWithFavoritePizza,
    getAllFavoritePizzasWithoutRepeat,
    updatePizzasSuperFat,
    getNumberOfWeapons,
    getPizzaWithId,
    addTurtleFavoritePizza,
}

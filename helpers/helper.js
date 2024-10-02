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


module.exports = {
    getTurtlesWithFavoritePizza,
    getAllFavoritePizzasWithoutRepeat,
    // readPizzas,
    // readWeapons,
    // readTurtles,
}

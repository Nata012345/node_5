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
const readTurtles = async () =>{
    try {
        const turtle = await bd.turtles.findAll();
        console.log("Turtles retrieved successfully:", turtle);
    } catch (err) {
        console.error("Error retrieving turtles:", err);
    }
}
module.exports = {
    initializeData,
    readPizzas,
    readWeapons,
    readTurtles
}

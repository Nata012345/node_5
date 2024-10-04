const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: 'postgres',
        logging: false
    });

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    // let models = {
    //     turtles,
    //     weapons,
    //     pizzas,
    // }
    //one to many
    //     turtles.belongsTo(weapons);
    //     weapons.hasMany(turtles, {foreignKey: 'weaponId'});
    //many to many
    //     turtles.belongsToMany(pizzas, {through: 'turtlesPizzas'});
    //     pizzas.belongsToMany(turtles, {through: 'turtlesPizzas'});

    // turtles.associate = (models) => {
        turtles.belongsTo(weapons, { foreignKey: 'weaponId', as: 'weapon' });
        turtles.belongsTo(pizzas, { foreignKey: 'firstFavoritePizzaId', as: 'firstFavoritePizza' });
        turtles.belongsTo(pizzas, { foreignKey: 'secondFavoritePizzaId', as: 'secondFavoritePizza' });
    // };

    pizzas.hasMany(turtles, { foreignKey: 'firstFavoritePizzaId', as: 'firstFavoriteTurtles' });
    pizzas.hasMany(turtles, { foreignKey: 'secondFavoritePizzaId', as: 'secondFavoriteTurtles' });

    // Object.values(models).forEach(model => {
    //     if (model.associate) {
    //         model.associate(models);
    //     }
    // });

    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};
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

//one to many
    turtles.belongsTo(weapons);
    weapons.hasMany(turtles, {foreignKey: 'weaponId'});
//many to many
    turtles.belongsToMany(pizzas, {through: 'turtlesPizzas'});
    pizzas.belongsToMany(turtles, {through: 'turtlesPizzas'});

    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};
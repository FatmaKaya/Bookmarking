module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        pass: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        startToken: {
            type: Sequelize.DATE,
        },
        endToken: {
            type: Sequelize.DATE,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        }
    });
    return User;
};
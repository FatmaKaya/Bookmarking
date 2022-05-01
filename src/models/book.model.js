module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        bookId: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        }
    });
        Book.associate = function (models) {
            Book.hasMany(models.user, { foreignKey: 'userId', as: 'users' })
        };
    return Book;
};
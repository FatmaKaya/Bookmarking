module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        userId:{
            type: Sequelize.STRING
        },
        bookId:{
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
    return Book;
};
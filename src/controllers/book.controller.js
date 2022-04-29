const db = require("../models");
const Book = db.book;
var books = require('google-books-search');

exports.search = (req, res) => {
    let text = req.query.text
    var options = {
        offset: 0,
        limit: 40,
        type: 'books',
        order: 'relevance',
        lang: 'tr'
    };

    books.search(text, options, function (error, results) {
        if (!error) {
            res.send(results);
        } else {
            res.status(500).send({
                type: "error",
                title: "error",
                message: error
            });
        }
    });
};

exports.add = (req, res) => {
    // Validate request
    let book = { ...req.body, userId: req.user.id };
    if (!book.bookId || !book.title || !book.link) {
        res.status(400).send({
            type: "warning",
            title: "Warning",
            message: "All fields are required.!"
        });
        return;
    }

    Book.findAll({ where: { userId: req.user.id, bookId: book.bookId } })
        .then(books => {
            if (books.length == 0) {
                Book.create(book).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        type: "warning",
                        title: "Warning",
                        message: "Some error occurred while adding the Book."
                    });
                });
            }
            else {
                res.status(500).send({
                    type: "warning",
                    title: "Warning",
                    message: "This book is already attached!"
                });
            }
        }).catch(err => {
            res.status(500).send({
                type: "error",
                title: "error",
                message: "Not working!"
            });
        });
};

exports.remove = (req, res) => {
    const id = req.params.id;
    Book.findOne({ where: { id: id } })
        .then(book => {
            if (book != null) {
                if (book.dataValues.userId == req.user.id) {
                    console.log("benim")
                    Book.destroy({
                        where: { id: id }
                    }).then(num => {
                        if (num == 1) {
                            res.send({
                                type: "info",
                                title: "success",
                                message: "Bookmarking was deleted successfully!"
                            });
                        } else {
                            res.send({
                                type: "info",
                                title: "success",
                                message: "Failed to delete bookmark!"
                            });
                        }
                    }).catch(err => {
                        res.status(500).send({
                            message: "Failed to delete bookmark!"
                        });
                    });
                }
                else {
                    res.status(500).send({
                        type: "error",
                        title: "error",
                        message: "I don't have such a bookmark!"
                    });
                }
            }
            else {
                res.status(500).send({
                    type: "error",
                    title: "error",
                    message: "I don't have such a bookmark!"
                });
            }
        }).catch(err => {
            res.status(500).send({
                type: "error",
                title: "error",
                message: "Not working!"
            });
        });
};

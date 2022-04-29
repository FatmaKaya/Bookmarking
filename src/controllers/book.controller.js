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

    console.log({ userId: req.user.id, bookId: book.bookId })
    Book.findAll({ where: { userId: req.user.id, bookId: book.bookId } })
        .then(books => {
            console.log(books.length)
            if (books.length == 0) {
                Book.create(book)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
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



    // Book.create(book)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Book."
    //         });
    //     });


};

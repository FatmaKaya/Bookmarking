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

    books.search(text,  options, function (error, results) {
        if (!error) {
            res.send({
                message: results
            });
        } else {
            res.status(500).send({
                message: error
              });
        }
    });
};

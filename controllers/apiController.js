var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Get all Todos based on username
    app.get('/api/todos/:uname', function (req, res) {
        Todos.find({ username: req.params.uname }, function(err, todos) {
            if (err) throw err;

            res.send(todos);
        });
    });

    // Get a Todo by id
    app.get('/api/todo/:id', function (req, res) {
        Todos.findById({ _id: req.params.id }, function (err, todo) {
            if (err) throw err;

            res.send(todo);
        });
    });

    // Update/Create a Todo
    app.post('/api/todo', function (req, res) {
        if (req.body.id) {
            // update
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function (err, todo) {
                if (err) throw err;
                
                res.send('Updated successfully');
            });
        } else {
            // create
            var newTodo = Todos({
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });

            newTodo.save(function (err, todo) {
                if (err) throw err;

                res.send('Created successfully');
            });
        }
    });

    // Delete a Todo
    app.delete('/api/todo', function (req, res) {
        Todos.findByIdAndRemove(req.body.id, function (err, todo) {
            if (err) throw err;

            res.send('Deleted successfully');
        });
    });
};
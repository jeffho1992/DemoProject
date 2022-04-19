const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    /*.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })*/
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus = 200;
    })
    .get(cors.cors, (req, res, next) => {
        Dishes.find(req.query)
            .populate('comments.author')
            .then((dishes) => {
                res.sendStatus = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will send all the dishes to you!');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.create(req.body)
            .then((dishes) => {
                console.log('Dish created ', dishes);
                res.sendStatus = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


dishRouter.route('/:dishId')
    /*.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })*/
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus = 200;
    })
    .get(cors.cors, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        //res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        //res.write('Updating the dish: ' + req.params.dishId + '\n');
        //res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
        //res.end('Deleting dish: ' + req.params.dishId);
    });




module.exports = dishRouter;
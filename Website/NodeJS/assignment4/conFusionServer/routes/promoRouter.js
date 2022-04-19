const express = require("express");
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Promotions = require('../models/promotions');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    /*.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })*/
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus = 200;
    })
    .get(cors.cors, (req, res, next) => {
        Promotions.find({}).
            then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will send all the promotion to you!');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.create(req.body)
            .then((promos) => {
                console.log("Promotion created ", promos);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotion');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        res.end('Deleting all promotions');
    });


promoRouter.route('/:promoId')
    /*.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })*/
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus = 200;
    })
    .get(cors.cors, (req, res, next) => {
        Promotions.findById(req.params.dishId)
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => next(err))
            .catch((err) => next(err));
        //res.write('Updating the promotion: ' + req.params.promoId + '\n');
        //res.end('Will update the promotion: ' + req.body.name +' with details: ' + req.body.description);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
        //res.end('Deleting promotion: ' + req.params.promoId);
    });

module.exports = promoRouter;
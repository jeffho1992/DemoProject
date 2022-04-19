const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Leaders = require('../models/leaders');
const leaderRouter = express.Router();


leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    /*.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })*/
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus = 200;
    })
    .get(cors.cors, (req, res, next) => {
        Leaders.find(req.query)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'appplication/json');
                res.json(leader);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will send all the leader to you!');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log("Leaders created ", leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'appplication/json');
                res.json(leader);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'appplication/json');
                res.json(resp);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Deleting all leader');
    });


leaderRouter.route('/:leaderId')
    /*.all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })*/
    .get(cors.cors, (req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'appplication/json');
                res.json(leader);
            }, (err) => {
                next(err)
                    .catch((err) => next(err));
            });
        //res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId,{
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
        //res.write('Updating the leader: ' + req.params.leaderId + '\n');
        //res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
        //res.end('Deleting leader: ' + req.params.leaderId);
    });

module.exports = leaderRouter;
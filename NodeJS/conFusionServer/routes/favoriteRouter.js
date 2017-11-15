const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Favorites = require('../models/favorites');
const User = require('../models/user');
const Dishes = require('../models/dishes');

const cors = require('./cors');
const authenticate = require('../authenticate');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({'user': req.user._id})
    .populate({path: 'user', model: User})
    .populate({path: 'dishes', model: Dishes})
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({'user': req.user._id})
    .then((favorite) => {
        if (favorite != null) {
            console.log('update favorite');
            for (var i = 0; i < req.body.length; i ++ ) 
                if (favorite.dishes.indexOf(req.body[i]._id) === -1)
                    favorite.dishes.push(req.body[i]);
            favorite.save()
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);                
            }, (err) => next(err));
        } else {
            Favorites.create({'user': req.user._id})
            .then((favorite) => {
                console.log('new favorite');
                for (var i = 0; i < req.body.length; i ++ ) 
                    if (favorite.dishes.indexOf(req.body[i]._id) === -1)
                        favorite.dishes.push(req.body[i]);
                favorite.save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);                
                }, (err) => next(err));
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));   
});

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        if (!favorites) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": false, "favorites": favorites});
        }
        else {
            if (favorites.dishes.indexOf(req.params.dishId) < 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": false, "favorites": favorites});
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": true, "favorites": favorites});
            }
        }

    }, (err) => next(err))
    .catch((err) => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/' + req.params.dishId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({'user': req.user._id})
    .then((favorite) => {
        if (favorite != null) {
            if (favorite.dishes.indexOf(req.params.dishId) > -1) {
                err = new Error('Favorite dish ' + req.params.dishId + ' already exists');
                err.status = 403;
                return next(err); 
            } else {
                favorite.dishes.push({'_id': req.params.dishId});
                favorite.save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);                
                }, (err) => next(err));
            }
        } else {
            Favorites.create({'user': req.user._id})
            .then((favorite) => {
                favorite.dishes.push({'_id': req.params.dishId});
                favorite.save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);                
                }, (err) => next(err));
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({'user': req.user._id})
    .then((favorite) => {
        if (favorite == null) {
            err = new Error('Favorite dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        } else {
            if (favorite.dishes.indexOf(req.params.dishId) === -1) {
                err = new Error('Favorite dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
            favorite.dishes.pull({'_id': req.params.dishId});
            favorite.save()
            .then((favorite) => {
                Favorites.findById(favorite._id)
                .populate('user')
                .populate('dishes')
                .then((favorite) => {
                    console.log('Favorite Dish Deleted!', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            })
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favoriteRouter;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
   dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes',
        unique: true
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorites;
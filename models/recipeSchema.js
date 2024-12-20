const mongoose = require("mongoose");
const ingredientSchema = require("./ingredient");

const recipeSchema=mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    ingredients: [ingredientSchema],
    directions: {
        type: [String], 
        required: true,
    },
    recipeImage: {
        type: String, 
        required: false
    },
    timeCook: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Recipe", recipeSchema)
const mongoose = require("mongoose")

const ingredientSchema=mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    measure: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }

});

module.exports=mongoose.model("Ingredients", ingredientSchema)
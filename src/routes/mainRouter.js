const express = require("express");

const router = express.Router();

const {
    mainController,
    getRecipes,
    getRecipeById,
    searchByIngredient,
} = require("../controllers/mainController.js");

const { register } = require('../controllers/registerController');

/* ============================================================= */
router.get("/", mainController.get);

router.get("/recipes", getRecipes);

router.get("/recipes/:id", getRecipeById);

router.get("/search", searchByIngredient);


router.post('/register', register);
/* ============================================================= */
module.exports = router;

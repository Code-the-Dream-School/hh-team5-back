const express = require("express");
const User = require("../models/user");

const router = express.Router();

const {
    mainController,
    getRecipes,
    getRecipeById,
    searchByIngredient,
} = require("../controllers/mainController.js");

const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController.js');
const { logout } = require('../controllers/logoutController.js');


const authenticate = require('../middleware/authenticate');
/* ============================================================= */
router.get("/", mainController.get);

router.get("/recipes", getRecipes);

router.get("/recipes/:id", getRecipeById);

router.get("/search", searchByIngredient);


router.post('/register', register);
router.post('/login', login);

router.post('/logout', logout);

// Protected Route - Favorite List
router.get('/favorites', authenticate, async (req, res) => {
    const favorites = await User.findOne({ username: req.user })
    res.status(200).json(favorites.favoriteRecipes)
});
// Requires authentication

/* ============================================================= */
module.exports = router;

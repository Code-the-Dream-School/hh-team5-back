const express = require("express");

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
router.get("/", authenticate, (req, res) => res.status(200).json({ 
    message: 'User is logged in.', user: req.user 
}));

router.get("/recipes", getRecipes);

router.get("/recipes/:id", getRecipeById);

router.get("/search", searchByIngredient);


router.post('/register', register);
router.post('/login', login);

router.post('/logout', logout); 

// Protected Route - Favorite List
router.get('/favorites', authenticate, (req, res) => res.json([
    { id: 1, name: "Recipe 1", description: "This is a description of Recipe 1" },
    { id: 2, name: "Recipe 2", description: "This is a description of Recipe 2" },
    { id: 3, name: "Recipe 3", description: "This is a description of Recipe 3" }
]));
 // Requires authentication

/* ============================================================= */
module.exports = router;

const express = require("express");

const router = express.Router();

const {
  mainController,
  getRecipes,
  getRecipeById,
  searchByIngredient,
} = require("../controllers/mainController.js");

//
const { register } = require("../controllers/registerController");
const { login } = require("../controllers/loginController.js");
const { logout } = require("../controllers/logoutController.js");

const authenticate = require("../middleware/authenticate");

//
const {
  getAllFavorite,
  createFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController.js");

// const authenticate = require("../middleware/authenticate");
/* ============================================================= */
router.get("/", authenticate, (req, res) => res.status(200).json({ 
    message: 'User is logged in.', user: req.user 
}));

router.get("/recipes", getRecipes);

router.get("/recipes/:id", getRecipeById);

router.get("/search", searchByIngredient);

//
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//
router.get("/favorite", authenticate, getAllFavorite);
router.post("/favorite", authenticate, createFavorite);
router.delete("/favorite", authenticate, deleteFavorite);

/* ============================================================= */
module.exports = router;

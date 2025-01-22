const User = require("../models/user");
const Recipe = require('../models/recipe');

/* ============================================================= */
const getAllFavorite = async (req, res) => {
  const favorites = await User.findOne({ username: req.user })
  res.status(200).json(favorites.favoriteRecipes)
};

const createFavorite = async (req, res) => {
  console.log(req.body.id, "createfav");

  const recipeID = req.body.id;

  console.log("req.user =", req.user);
  console.log("recipeID =", recipeID);

  // update user's current favorite list
  const result = await User.updateOne(
    { username: req.user },
    { $addToSet: { favoriteRecipes: recipeID } }
  );

  // check if it has already been added
  if (!result.modifiedCount) {
    return res.status(501).json({
      msg: "Favorite recipe has been already saved ",
    });
  }

  const user = await User.findOne({ username: req.user });

  // confirm recipe was added
  res.status(200).json({
    msg: "New favorite recipe is saved",
    favorite: user.favoriteRecipes,
  });
};

const deleteFavorite = async (req, res) => {
  console.log(req.body.id, "deletefav");

  const recipeID = req.body.id;

  const result = await User.updateOne(
    { username: req.user },
    { $pull: { favoriteRecipes: recipeID } }
  );

  console.log(result);

  if (!result.modifiedCount) {
    return res.status(501).json({
      msg: "No favorite recipe found",
    });
  }

  const user = await User.findOne({ username: req.user });

  res.status(200).json({
    msg: "A favorite recipe has been removed",
    favorite: user.favoriteRecipes,
  });
};
/* ============================================================= */
module.exports = {
  getAllFavorite,
  createFavorite,
  deleteFavorite,
};
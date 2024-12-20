
const mainController = {};

mainController.get = (req, res) => {
    return res.json({
        data: 'This is a app!'
    });
};

module.exports = mainController;
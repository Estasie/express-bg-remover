const db = require('../entities/Database');

module.exports = (req, res) => {
    const allImgs = db.find().map((img) => img.toPublicJSON());
    return res.json(allImgs);
};
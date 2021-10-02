const Img = require('../entities/Img');
const db = require('../entities/Database');

module.exports = async (req, res) => {
    const filename = req.file.filename;
    const id = req.file.imageId;
    const imgFile = new Img(id, req.file.mimetype, req.file.size);

    await db.insert(imgFile);

    return res.json({ id: id })
};
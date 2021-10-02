const Img = require('../entities/Img');
const db = require('../entities/Database');

module.exports = async (req, res) => {
    try {
        const id = req.file.imageId;
        const imgFile = new Img(id, req.file.mimetype, req.file.size);

        await db.insert(imgFile);

        return res.json({ id: id })
    }
    catch {
        res.status(500).send(ex);
    }
};
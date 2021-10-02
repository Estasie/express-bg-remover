const db = require('../entities/Database');

module.exports = async (req, res) => {
    const imgId = req.params.id;

    if (!db.findOne(imgId)) {
        return res.status(404).send('Not Found');
    }

    const id = await db.remove(imgId);

    return res.json({ id });
};

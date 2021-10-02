const db = require('../entities/Database');

module.exports = (req, res) => {
    try {
        const allImgs = db.find().map((img) => img.toPublicJSON());
        
      //  if (allImgs.length <= 0) return res.json({ id: undefined })
      //  console.log(res.json(allImgs))
        return res.json(allImgs);
    } catch {
        res.status(500).send(ex);
    }
};
const db = require('../entities/Database');
const path = require('path');
const { imgFolder } = require('../config');

module.exports = async (req, res) => {
	const imgId = req.params.id;
	const img = db.findOne(imgId);
	
    if (!img) {
		return res.status(404).send('Not Found');
	}

	const extention = img.mimetype.split('/')[1];
	
	return res.download(path.resolve(imgFolder, `${img.id}.${extention}`));
};

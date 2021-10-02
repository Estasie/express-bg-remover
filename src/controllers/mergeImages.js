const db = require('../entities/Database');
const { imgFolder } = require('../config');
const fs = require('fs');
const { replaceBackground } = require('backrem');
const path = require('path');

module.exports = async (req, res) => {


    const frontId = req.query.front;
    const backId = req.query.back;
    const color = req.query.color ? req.query.color.split(',').map((el) => +el) : undefined;
    const treshold = req.query.treshold ? +req.query.treshold : 0;

	const frontImg = db.findOne(frontId);
	const backImg = db.findOne(backId);

	if (!frontImg || !backImg) {
		return res.status(404).send('Not Found');
	}

	const frontImgExt = frontImg.mimetype.split('/')[1];
	const backImgExt = backImg.mimetype.split('/')[1];

	const frontFile = fs.createReadStream(path.resolve(imgFolder, `${frontId}.${frontImgExt}`));
	const backFile = fs.createReadStream(path.resolve(imgFolder, `${backId}.${backImgExt}`));

	replaceBackground(frontFile, backFile, color, treshold)
		.then(
			(readableStream) => {
				readableStream.pipe(res); 
			},
			() => {
				return res.send('Different image size');
			}
		)
		.then(() => {
			res.header('Content-disposition', 'attachment; filename=merge.jpeg');
			res.header('Content-Type', frontImg.mimetype);
			return res.download;
		})
};
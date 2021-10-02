const path = require('path');
const { imgFolder } = require('../config');
const { removeFile } = require('../utils/fs');

module.exports = class Img {
	constructor(id, mimetype, size, createdAt) {
		this.id = id;
		this.size = size;
		this.createdAt = createdAt || Date.now();
		this.mimetype = mimetype;
	}

	async removeOriginal() {
		await removeFile(path.resolve(imgFolder, `${this.id}.${this.mimetype.split('/')[1]}`));
	}

	toPublicJSON() {
		return {
			id: this.id,
			size: this.size,
			createdAt: this.createdAt,
		}
	}

	toJSON() {
		return {
			id: this.id,
			mimetype: this.mimetype,
			size: this.size,
			createdAt: this.createdAt,
		}
	}
}

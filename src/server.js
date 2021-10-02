const path = require('path');
const api = require('./controllers');
const express = require('express');
const { PORT, imgFolder } = require('./config');
const multer = require('multer');
const { idGenerator } = require("./utils/idGenerator");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, imgFolder);
	},
	filename: function (req, file, cb) {
		imageId = idGenerator();
		file.imageId = imageId;
		cb(null, `${imageId}.${file.mimetype.split('/')[1]}`);
	},
})

const upload = multer({ storage: storage });

const app = express();

app.use(express.json());

app.get('/list', api.getImages);
app.get('/image/:id', api.getImage);
app.post('/upload', upload.single('image'), api.uploadImage);
app.delete('/image/:id', api.deleteImage);
app.get('/merge?*', api.mergeImages);

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})

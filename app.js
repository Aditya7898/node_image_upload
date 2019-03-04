const express = require('express');
const path = require('path');
const multer = require('multer');
const ejs = require('ejs');

const app = express();

// set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'Image' + Date.now() + path.extname(file.originalname));
    }
});


// multiple Images
var upload = multer({
    storage: storage
});

// Init upload for single image
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('imageFile');


// function checkFileType(file, cb) {
//     // Allowed extentions
//     const filetypes = /jpeg|jpg|png/;
//     // check ext.
//     const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
//     // check MIME type
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: image only');
//     }
// }

// ejs
app.set('view engine', 'ejs');

// Public folder
app.use(express.static('./public'));
app.get('/', (req, res) => res.render('index'));

// for multiple images
app.post('/upload', upload.any(), function (req, res, next) {
    console.log(req.files);
    res.send(req.files);
});

// For single image
// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.render('index', {
//                 msg: err
//             });
//         } else {

//             console.log(req.file);


//             if (req.file == undefined) {
//                 res.render('index', {
//                     msg: 'Error: no file selected'
//                 });
//             } else {
//                 res.render('index', {
//                     msg: 'File Uploaded',
//                     file: `uploads/${req.file.filename}`
//                 });
//             }
//         }
//     });
// })


app.listen(3000, () => {
    console.log(`Server started on port`);
});


// multiImage upload
// var upload = multer({ dest: './public/uploads/' });

// app.post('/upload', upload.any(), function (req, res, next) {
//     console.log(req.files);
//     res.send(req.files);
// });
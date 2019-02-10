var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Database Connected Successfully'))
  .catch(err => console.log(err));

var ImageUpload = require('./db_models/image_model');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', index);
app.use('/users', users);

var  filename;
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, filename);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

app.post('/upload', function(req, res) {
    upload(req,res,function(err,result){
        if(err){
            res.json({ status: 201, data: 'Something went wrong!' });  
        }
        else{
            let obj = {
                imageName : filename
            }
            var imageUpload = new ImageUpload(obj);
            imageUpload.save(function (err, result) {
                if (err){
                    res.json({ status: 201, data: err });                            
                }else{
                    res.json({ status: 200, data: 'File uploaded sucessfully!.' });                                                    
                }
            })
        }
    });
});

app.get('/getListOfImages', function(req, res) {
    ImageUpload.find({isDeleted: false}, function(err, listresult){
        if (err){
            res.json({ status: 201, data: err });                            
        }else{
            res.json({ status: 200, data: listresult });                                                    
        }
    })
});

app.post('/deleteImage', function(req, res) {
    ImageUpload.findOneAndUpdate(req.body, { $set: {isDeleted: true }},function (err, result) {
        if (err){
            res.json({ status: 201, data: err });                            
        }else{
            res.json({ status: 200, data: 'File deleted sucessfully!.' });                                                    
        }
    });
});

module.exports = app;

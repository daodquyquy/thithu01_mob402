const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var NhanVien = require('../models/nhanvien')
const multer = require('multer');
const alert = require('alert');

const parser = bodyParser.urlencoded({ extended: true });

app.use(parser);
// SET STORAGE
let storage = multer.diskStorage({
    destination: 'image/',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage
})

app.get('/', (req, res) => {
    NhanVien.find({}).sort({namsinhnv : -1})
        .then(pros => {
            res.render("home"
                , { pros: pros.map(pro => pro.toJSON()) }
            )
        })
})
app.get('/api/add', (req, res) => {
    res.render("newnhanvien");
})
app.get('/api/updatenv/:id', async (req, res) => {
    await NhanVien.findById(req.params.id, (err, pros) => {
        if (!err) {
            res.render('updatenhanvien', { pros: pros.toJSON() })
        }
    })
})
app.get('/api/thongtinchitiet/:id',async (req,res)=>{
    await NhanVien.findById(req.params.id, (err, pros) => {
        if (!err) {
            res.render('thongtinchitiet', {layout : 'main', pros: pros.toJSON()})
        }
    })
})

app.post('/api/newnhanvien', upload.single('anhnv'), async (req, res) => {
    
    try {
        if(req.body.manv == ''){
            alert('Bạn chưa nhập mã nhân viên');
            return;
        }
        if(req.body.tennv == ''){
            alert('Bạn chưa nhập tên nhân viên');
            return;
        }
        if(req.body.namsinhnv == '' || req.body.namsinhnv < 0){
            alert('Bạn chưa nhập năm sinh nhân viên hoặc năm sinh nhân viên phải > 0');
            return;
        }
        const nhanVien = {
            manv: req.body.manv,
            tennv: req.body.tennv,
            namsinhnv: req.body.namsinhnv,
            anhnv: req.file.filename
        }
        await NhanVien.insertMany([nhanVien])
    
        NhanVien.find({}).sort({namsinhnv : -1})
            .then(pros => {
                res.render("home"
                    , { pros: pros.map(pro => pro.toJSON()) }
                )
            })
    } catch (error) {
        alert("Bạn chưa chọn ảnh");
        return;
    }    

        
    
})

app.post('/api/updatenv', upload.single('anhnv'), async (req,res)=>{
    try {
        if(req.body.manv == '' ){
            alert('Bạn chưa nhập mã nhân viên');
            return;
        }
        if(req.body.tennv == ''){
            alert('Bạn chưa nhập tên nhân viên');
            return;
        }
        if(req.body.namsinhnv == '' || req.body.namsinhnv < 0){
            alert('Bạn chưa nhập năm sinh nhân viên hoặc năm sinh nhân viên phải > 0');
            return;
        }
        await NhanVien.findOneAndUpdate({ _id: req.body.id }, {
            manv: req.body.manv,
            tennv: req.body.tennv,
            namsinhnv: req.body.namsinhnv,
            anhnv: req.file.filename
        }, { new: true }, (err) => {
            if (!err) {
                NhanVien.find({}).sort({namsinhnv : -1})
                    .then(pros => {
                        res.render("home"
                            , { pros: pros.map(pro => pro.toJSON()) }
                        )
                    })
            } else {
                console.log(err);
            }
    
        })
    } catch (error) {
        alert("Bạn chưa chọn ảnh");
        return;
    }
})


app.get('/api/deletenv/:id',async (req,res)=>{
    try {
        const nhanVien = await NhanVien.findByIdAndDelete(req.params.id, req.body);
        if (!nhanVien) {
            res.status(400).send("No item found");
        } else {

            res.redirect('/');
        }
    } catch (error) {

        res.status(500).send(error);
    }
})
app.get('/api/postman',(req,res)=>{
    NhanVien.find({}).sort({namsinhnv : -1})
        .then(pros => {
            res.json({ pros: pros.map(pro => pro.toJSON()) }
            )
        })
})

module.exports = app;
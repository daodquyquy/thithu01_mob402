const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const apiRoute = require('./routes/api');
var { engine } = require('express-handlebars');
var mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/ThiThu", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("mongodb connected")
    })
    .catch(() => {
        console.log("fail to connect")
    })

app.use('/',apiRoute);

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "views");

app.listen(port,()=>{
    console.log(`Started`);
})
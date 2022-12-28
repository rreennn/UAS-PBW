const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const jsdom = require("jsdom")
const {JSDOM} = jsdom
const {window} = new JSDOM ()
const {document} = (new JSDOM ("")).window

global.document = document
var $ = require("jquery")(window)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set ("view engine", "ejs")
app.set("views", "views") 

const db = mysql.createConnection({
    host: "localhost",
    database: "pengguna",
    user: "root",
    password: "", 
})

db.connect((err) => {
    if (err) throw err
    console.log('database connected');

    app.get("/", (req, res)=> {
    const sql = "SELECT * FROM user"
    db.query(sql, (err, result) =>{
        const users = JSON.parse(JSON.stringify(result))
            res.render("index", {users: users, title: "coba"})
            })
        })
        
        app.get("/bukutamu",(req,res)=>{
            const sql = "SELECT * FROM user"
            db.query(sql, (err, result) =>{
                const users = JSON.parse(JSON.stringify(result))
                    res.render("bukutamu.ejs", {users: users, title: "coba"})
            })
        })
    app.post("/bukuTamu",(req,res)=>{
        const insertSql = `INSERT INTO user (username, email) VALUES ('${req.body.username}', '${req.body.email}');`
        db.query(insertSql,(err,result)=>{
            if (err) throw err
            let username = req.body.username
            let email = req.body.email

            console.log (username)
            res.redirect("/home")
        })
    })
})

app.listen(3000, () => {
    console.log("server ready")
})

app.get("/home",(req,res) => {
    res.render("home.ejs")
})

app.get("/product", (req,res) => {
    res.render("product.ejs")
})

app.use(express.static(__dirname+'/public'))
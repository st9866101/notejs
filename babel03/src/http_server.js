var express = require('express');
// 2. 建立web server 物件
const url = require('url');
//使用URL解析
const bodyParser = require('body-parser');

const multer = require('multer'); //上傳外掛
const upload = multer({
    dest: 'tmp_uploads/'
}); //設定上傳路徑
const app = express();
const session = require('express-session');//session導入
//const urlencodedParser = bodyParser.urlencoded({extended: false});
const mysql=require('mysql');
const db=mysql.createConnection({
host:'localhost',
user:'vader',
password: 'water520',
database: 'mytest'
});
db.connect();
const bluebird=require('bluebird');
bluebird.promisifyAll(db);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//session 設定
app.use(session({
    // 新用戶沒有使用到session 物件時不會建立session 和發送cookie
    saveUninitialized: false,
    resave: false, // 沒變更內容是否強制回存
    secret: '加密用的字串',
    cookie: {
    maxAge: 1200000, // 20分鐘，單位毫秒
    }
    }));


// 3. 路由
app.set('view engine', 'ejs'); //ejs樣板設定
app.use(express.static('public'));
//ejs樣板使用
// routes 路由

app.get('/', (req, res) => {

    res.render('home', {
        name: 'Shinder Lin',
        a: 123
    });
});

app.get('/b.html', (req, res) => {
    res.send(`<h2>
        Hello world!
        </h2>`)
});
app.get('/sales', function (request, response) { //這裡是ejs檔名
    const sales = require(__dirname + '/../data/sales'); //下面第二個
    response.render('sales', { //這裡是ejs檔名
        sales: sales
        // 第一個是字串在ejs使用 第二個是從JSON拿到的資料
    });

    // response.json(sales);
});
app.get('/sales2', function (request, response) {
    const sales = require(__dirname + '/../data/sales');
    response.render('sales2', { //這也是ejs檔名
        sales: sales
    });
    // response.json(sales);
});
app.get('/try-qs', function (request, response) {
    const urlParts = url.parse(request.url, true);
    console.log(urlParts);

    response.render('try-qs', {
        query: urlParts.query
    });

});
app.get('/try-post-form', (req, res) => {
    res.render('try-post-form');
});
app.get('/try-post-form/123', (req, res) => {
    res.render('try-post-form');
});
app.post('/try-post-form', (req, res) => {
    res.render('try-post-form', req.body);

    //res.send(JSON.stringify(req.body));
});

app.get('/try-post-form2', (req, res) => {
    res.send('get: try-post-form2');
});
app.post('/try-post-form2', (req, res) => {
    res.json(req.body);
});
app.put('/try-post-form2', (req, res) => {
    res.send("PUT: try-post-form2");
});

//上傳
// app.post('/try-upload',upload.single('avatar'),(req,res)=>{
// console.log(req.file);
// res.send('ok');
// });

//上船複雜版
app.post('/try-upload', upload.single('avatar'), (req, res) => {
    if (req.file && req.file.originalname) {
        console.log(req.file);

        switch (req.file.mimetype) {
            case 'image/png':
            case 'image/jpeg':
                fs.createReadStream(req.file.path)
                    .pipe(
                        fs.createWriteStream('public/img/' + req.file.originalname)
                    );

                res.send('ok');
                break;
            default:
                return res.send('bad file type');
        }
    } else {
        res.send('no uploads');
    }
});
app.get('/my-params1/:action/:id', (req, res) => {
    res.json(req.params);
});
// 測試 http://localhost:3000/my-params1/1/vader 可得物件
app.get(/^\/09\d{2}\-?\d{3}\-?\d{3}/, (req, res) => {
    let str = req.url.slice(1);
    str = str.split('-').join('');
    str = str.substring(0, 9);
    res.send('手機: ' + str);
});

// const admin1 = require(__dirname + '/admins/admin1');
// admin1(app);
const admin2Router = require(__dirname + '/admins/admin1');
app.use(admin2Router);

const admin3Router = require(__dirname + '/admins/admin3');
app.use('/123',admin3Router);

app.get('/try-session', (req, res)=>{
    req.session.my_views = req.session.my_views || 0;
    req.session.my_views++;

    res.json({
        aa: 'hello',
        'my views': req.session.my_views
    });
});

const moment = require('moment-timezone');
app.get('/try-moment', (req, res)=>{
const myFormat = 'YYYY-MM-DD HH:mm:ss';
const exp = req.session.cookie.expires;
const mo1 = moment(exp);
const mo2 = moment(new Date());
res.contentType('text/plain');
res.write( exp + "\n");
res.write('台北' + mo1.format(myFormat) + "\n"); // 系統時區
res.write('倫敦' + mo1.tz('Europe/London').format(myFormat) + "\n");
res.write('台北' + mo2.format(myFormat) + "\n");
res.write('倫敦' + mo2.tz('Europe/London').format(myFormat) + "\n");
res.end( JSON.stringify(req.session));
});

app.get('/try-db', (req, res)=> {
    const sql = "SELECT * FROM `address_book` LIMIT 0, 5";
    db.query(sql, (error, results, fields)=>{
        console.log(error);
        console.log(results);
        console.log(fields);
      
        for(let r of results){
            r.birthday2 = moment(r.birthday).format('YYYY-MM-DD');
        }
        res.json(results);

        res.render('try-db',{
            rows: results
        });
    });
    //res.send('ok');
});
app.get('/try-db2',(req, res)=>{
    db.queryAsync("SELECT COUNT(1) total FROM `address_book`")
    .then(results=>{
        res.json(results);
    })
});

app.get('/', function (request, response) { //home路徑 某方面等於index
    response.render('home', {
        name: 'Vader',
        age: '32'
    });
});

app.get('/vader', function (request, response) {
    response.send('Hello vader!');
});
app.use((req, res) => {
        res.type('text/plain');
        res.status(404);
        res.send("404 nofind");

    }

)
// 4. Server 偵聽
app.listen(3000, function () {
    console.log('啟動server 偵聽埠號3000');
});
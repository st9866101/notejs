const express = require('express');
// 2. 建立web server 物件
const url = require('url');
//使用URL解析
const bodyParser = require('body-parser');

const app = express();
//const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 3. 路由
app.set('view engine', 'ejs');//ejs樣板設定

app.use(express.static('public'));
//ejs樣板使用
// routes 路由

app.get('/', (req, res)=>{

    res.render('home', {name:'Shinder Lin', a:123});
});

app.get('/b.html', (req, res)=>{
    res.send(`<h2>
        Hello world!
        </h2>`)});
app.get('/sales01', (req, res)=>{
    const sales = require('./../data/sales01');
    //res.send(JSON.stringify(sales));
    //res.json(sales);
    res.render('sales01', {
       my_var:  sales
    });
});

app.get('/try-qs', (req, res)=>{
    const urlParts = url.parse(req.url, true);
    console.log(urlParts);

    res.render('try-qs', {
        query:  urlParts.query
    });
});

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});
app.get('/try-post-form/123', (req, res)=>{
    res.render('try-post-form');
});
app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form', req.body);

    //res.send(JSON.stringify(req.body));
});


app.get('/try-post-form2', (req, res)=>{
    res.send('get: try-post-form2');
});
app.post('/try-post-form2', (req, res)=>{
    res.json(req.body);
});
app.put('/try-post-form2', (req, res)=>{
    res.send("PUT: try-post-form2");
});

app.use((req, res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('找不到頁面');
});

app.listen(3000, ()=>{
   console.log('server started 3000');
});








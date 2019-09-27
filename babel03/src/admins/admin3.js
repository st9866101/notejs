// src/admins/admin3.js
const express = require('express');
const router = express.Router();
router.route('/member/edit/:id')
.all((req, res, next)=>{
// 找到該會員資料
res.locals.memberData = {
name: 'shinder',
id: 'A002'
};
next();
})
.get((req, res)=>{
const obj = {
baseUrl: req.baseUrl, // 查看基底url
url: req.url,
data: res.locals.memberData
};
res.send('get edit:' + JSON.stringify(obj));
})
.post((req, res)=>{
res.send('post edit:' + JSON.stringify(res.locals.memberData));
});
module.exports = router;
const express = require('express');
const route = express.Router();
// 处理首页“添加学生”按钮发起的请求

route.get('/', (req, res) => {
    // 只渲染一个add模板
    res.render('register')
})

module.exports = route
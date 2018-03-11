const mongoose = require('mongoose')

// 连接数据库
// mongodb://是连接数据库的专用协议，类似http://
// students是数据库名称，不需要手动创建

mongoose.connect('mongodb://localhost/zy-students');
// 获取当前数据库连接

const db = mongoose.connection

db.on('error', err => console.error('数据库连接失败： ', err));
db.on('open', () => console.log('打开数据库连接'));

// mongoose.model()创建一个数据模型（类或构造函数）；
// mongoose 为MongoDB 增加了很多很强大的功能
// 大部分功能以model 为基础
// 第1个参数：模型的名称，也是数据库中集合的名称
// 第2个参数：Schema ，模式， 描述了数据的形状，
// 即数据中有哪些属性，属性的类型，属性的默认值，属性的验证等

const Student = mongoose.model('student', {
    name: String,
    age: Number,
    isMale: Boolean,
    phone: String,
    email: String,
    description: String,
    ip: String,
    createTime: Date,
    updateTime: Date
})

// 导出该模型，供外部使用
// 在server.js里可以用require()加载mongoose
module.exports = Student
// 首页的路由
const express = require('express'),
    Student = require('../mongoose')

// 创建一个路由对象route
const route = express.Router()

/**
 *  @param /:page 表示/后必须有字符
 *  @param /(:page)?表示/后可以有字符，也可以没有字符
 *         有字符串时可以通过page得到，没有字符时page是undefined
 */

route.get('/(:page)?', (req, res) => {
    var page = req.params.page;
    page = page || 1;
    // page是undefined 时，(page || 1) 是 1
    // page 是数字时， (page || 1)是page
    page = parseInt(page);
    page = page < 1 ? 1 : page

    // 每页显示5条数据
    var pageSize = 5;
    // Student 数据模型
    // find()查询数据库
    // count() 计数，例如：有40个学生，通过count()得到40个学生信息
    Student.find().count((err, total) => {
        console.log(total)

        if (err) {
            // 跳转到错误页面
        } else {
            // 如果total / pageSize除不尽（小数），需向上取整
            var pageCount = Math.ceil(total / pageSize);

            /**
             * select 对数据属性进行筛选，属性名之间用空格分割
             * 例如：page=3  第11到第15条信息
             * skip()跳到的条数
             * limit()限制的条数
             * select()选择，表示查询的字段，参数是数据模型的字段
             * exec()执行，执行以上查询
             */
            Student.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .select('name isMale age phone email!')
                .exec((err, data) => {
                    if (err) {
                        // 跳转到错误页
                    } else {
                        /**
                         * data 是查询到的数据
                         * data 是一个model数组
                         * model.toObject()可以将数据从模型实例中剥离出来
                         * console.dir(data)
                         * console.dir(data.map(m =>m.toObject()))
                         * res.render()渲染模板，在服务器渲染
                         * index指的是views/index.html文件
                         * page是当前的页码
                         * pageCount一共份几页，总页码数(total/pageSize)
                         */
                        res.render('index', {
                            page,
                            pageCount,
                            students: data.map(m => {
                                m = m.toObject();
                                m.id = m._id.toString();
                                delete m._id;
                                return m
                            })
                        })
                    }
                })
        }
    })
})

module.exports = route
const express = require('express'),
    Student = require('../mongoose')

const route = express.Router()

route.get('/:id', (req, res) => {
    // findById()找到指定id对应的数据
    Student.findById(req.params.id, (err, data) => {
        if (err) {
            // 跳转到错误页
        } else {
            var student = data.toObject();
            student.id = student._id.toString()
            delete student._id
                // 把找到后的数据渲染edit.html
            res.render('edit', { student })
        }
    })
})

module.exports = route
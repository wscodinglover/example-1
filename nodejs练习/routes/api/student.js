const express = require('express'),
    Student = require('../../mongoose')

const route = express.Router()

route.post('./register', (req, res) => {
    req.body.ip = req.ip;
    req.body.createTime = new Date();
    req.body.updateTime = req.body.reateTime

    console.log(req.body)
        // save()是mongodb保存数据方法

    new Student(req.body).save(err => {
        if (err) {
            res.json({ code: 'error', message: '系统错误' })
        } else {
            res.json({ code: 'success', message: '成功！' })
        }
    })
})


route.post('./add', (req, res) => {
    req.body.ip = req.ip;
    req.body.createTime = new Date();
    req.body.updateTime = req.body.reateTime

    console.log(req.body)
        // save()是mongodb保存数据方法

    new Student(req.body).save(err => {
        if (err) {
            res.json({ code: 'error', message: '系统错误' })
        } else {
            res.json({ code: 'success', message: '成功！' })
        }
    })
})



route.post('/edit/:id', (req, res) => {
    req.body.ip = req.ip;
    req.body.updateTime = new Date();

    console.log(req.body)
        // 找到id并更新该id对应的数据
    Student.findByIdAndUpdate(req.params.id, req.body, err => {
        if (err) {
            res.json({ code: 'error', message: '系统错误' })
        } else {
            res.json({ code: 'success', message: '成功！ ' })
        }
    })
})

route.post('/remove/:id', (req, res) => {
    // findByIdAndRemove()删除
    Student.findByIdAndRemove(req.params.id, err => {
        if (err) {
            res.json({ code: 'error', message: '系统错误' })
        } else {
            res.json({ code: 'success', message: '成功！' })
        }
    })
})

module.exports = route
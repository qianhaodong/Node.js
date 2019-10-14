const User = require("../db/user")

// 用户注册
const register = (userInfo = {}) => {
    return new Promise((resolve, reject) => {
        new User(userInfo).save((err => {
            if (err) {
                reject()
            } else {
                resolve()
            }
        }))
    })
}

// 用户登录
const login = (username, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username }, (err, data) => {
            if (err) {
                reject()
            } else {
                const result = data || {}
                if (!result.username || result.password !== password) {
                    reject()
                    return
                }
                resolve(result)
            }
        })
    })
}

module.exports = { register, login }
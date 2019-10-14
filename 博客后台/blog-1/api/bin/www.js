/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:09:42
 * @LastEditTime: 2019-09-04 15:56:05
 * @LastEditors: Please set LastEditors
 */
const http = require("http")

const PORT = 80
const serverHandle = require("../app")

const server = http.createServer(serverHandle)
server.listen(PORT, () => {
    console.log("server is running...")
})
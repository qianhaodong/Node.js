// process.stdin.pipe(process.stdout)

// 管道流 stream 演示
/* const http = require('http')

http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.pipe(res)
    }
}).listen(8000, () => {
    console.log('server is running...');
}) */

// 复制文件
/* const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

// 创建管道流
readStream.pipe(writeStream)

readStream.on('data', chunk => {
    console.log(chunk.toString());
})

readStream.on('end', () => {
    console.log('复制成功！');
}) */

// 读取文件
/* const fs = require('fs')
const path = require('path')
const http = require('http')

const fileName = path.resolve(__dirname, 'data.txt')

http.createServer((req, res) => {
    if (req.method === 'GET') {
        const readStream = fs.createReadStream(fileName)
        readStream.pipe(res)
    }
}).listen(8000, () => {
    console.log('server is running...');
}) */
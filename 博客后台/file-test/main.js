const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件
/* fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
}) */

// 写入文件
/* const content = '这是新写入的内容！\n'
const options = {
    flag: 'a'   // 追加写入，覆盖用 'w'
}

fs.writeFile(fileName, content, options, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log('successful')
}) */

// 判断文件是否存在
fs.exists(fileName, exists => {
    console.log('exists :', exists);
})
const fs = require("fs");
const path = require("path");

// 写日志
function writeLog(writeStream, log) {
	writeStream.write(`${log}\n`);
}

function createWriteStream(fileName) {
	const fullName = path.join(__dirname, "../../", "logs", fileName);
	const writeStream = fs.createWriteStream(fullName, {
		flags: "a"
	});

	return writeStream;
}

// 写入日志
const assessWriteStream = createWriteStream("access.log");
function access(log) {
	writeLog(assessWriteStream, log);
}

module.exports = {
	access
};

const mongoose = require("mongoose");
const {MONGODB_CONF} = require('../conf/db')

mongoose.connect(`mongodb://${MONGODB_CONF.host}/${MONGODB_CONF.database}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

module.exports = mongoose;

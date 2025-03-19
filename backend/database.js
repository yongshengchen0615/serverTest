const mongoose = require("mongoose");

// 連接 MongoDB
mongoose.connect("mongodb://localhost:27017/adminDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;

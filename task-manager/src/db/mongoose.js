const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false //if deprecation warning is coming
});

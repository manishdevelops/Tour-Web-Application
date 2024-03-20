const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config();

const DB = process.env.MONGODB_URI;

mongoose.connect(DB).then(() => {
    console.log('Connected to MONGODB...');
}).catch((err) => {
    console.log(err);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
});
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = "mongodb+srv://" + process.env.mongo_username + ":" + process.env.mongo_password + "@" + process.env.mongo_cluster_name + ".q2akd.mongodb.net/Demo";
        ;
        await mongoose.connect(url);
        console.log('Connected with CloudDB Successfully!!');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
module.exports = { connectDB };

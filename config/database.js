const mongoose = require("mongoose");
// const Url = 'mongodb://localhost/assignment_2'
const Url = 'mongodb+srv://ashish_protech:ashish123@firstcluster.yrutbmz.mongodb.net/'

exports.connect = () => {
    mongoose.connect(Url)
        .then(() => {
            console.log("sucessfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. existing now...");
            console.error(error);

        });
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://WaterMalone:asdf;lkj@cluster0-pgnd8.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

const userModel = new Schema({
    id: { type: String },
    display_name: { type: String },
    access_token:  { type: String },
    refresh_token: { type: String }
});

//export default mongoose.model('user', userModel);

// client.connect(err => {
//     const collection = client.db("NosticDB").collection("users");
//     // perform actions on the collection object
//     client.close();
// });
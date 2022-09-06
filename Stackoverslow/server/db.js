const mongoose = require('mongoose');

const urlString =
  'mongodb+srv://huzaifa51581:Khanum16@cluster0.qufyi.mongodb.net/stackoverflow?retryWrites=true&w=majority';
module.exports.connect = () =>
  mongoose
    .connect(urlString)
    .then((res) => {
      console.log('Connection successfull');
    })
    .catch((err) => {
      console.log(err);
    });

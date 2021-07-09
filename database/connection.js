var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

const url = 'mongodb://localhost:27017/morningnews'
const url2 = 'mongodb+srv://nicolacapsule:starcraft91@cluster0.12cob.mongodb.net/morningnews?retryWrites=true&w=majority'

mongoose.connect(url2,
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connecté à la base de données');
        }

    }
)


module.exports = mongoose
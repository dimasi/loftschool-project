`use strict`

let mongoose = require(`mongoose`);
let config = require(`./config`);
let options = {
    user: config.db.user,
    pass: config.db.password
}
let host = config.db.host;
let port = config.db.port;
let dbname = config.db.name;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${host}:${port}/${dbname}`, options)
    .catch(e => {
        console.error(e);
        throw e;
    });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', () => {
  console.log('Connection ok!');
});

module.exports = mongoose;

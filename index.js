`use strict`;

let fs = require(`fs`);
let path = require(`path`);
let express = require(`express`);
let jade = require(`jade`);
let app = express();
let config = require(`./config.json`);
let mongoose = require(`./mongoose`);
let bodyParser = require(`body-parser`);
let session = require(`express-session`);
let MongoStore = require(`connect-mongo`)(session);

app.use(session({
    secret: `dimasisecret`,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// app.set(`view engine`, `jade`);
// app.set(`views`, path.resolve(`./${config.http.publicRoot}/`));

app.use(express.static(path.resolve(config.http.publicRoot)));
app.use(bodyParser.json());

// Routes
app.get(`/`, (req, res) => {
    res.setHeader(`Content-type`, `text/html;charset=utf8`)
    res.end(`работает!`);
});

app.use(`/admin`, require(`./routes/admin/middleware`));
app.use(`/admin`, require(`./routes/admin/about`));
app.use(`/admin`, require(`./routes/admin/blog`));
app.use(`/admin`, require(`./routes/admin/works`));
app.use(`/`, require(`./routes/front`));
app.use(`/mail`, require(`./routes/mail`));
app.use(`/auth`, require(`./routes/auth`));

app.use((req, res, next) => {
    req.status(500);
    res.render(`error`, {
        error: err.message
    });
    console.error(err.message, err.stack);
});

app.listen(config.http.port, config.http.host, () => {
    let uploadDir = path.resolve(config.http.publicRoot, `upload`);

    if (fs.openSync(uploadDir, `rs`)) {
        fs.openSync(uploadDir, `rs`);
    }

    console.log(`Server is up on ${config.http.host}:${config.http.port}!`);
});

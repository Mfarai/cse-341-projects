const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mongodb = require('./data/database');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        process.exit(1); // exit the process if there is an error
    } else {
        app.listen(port, () => {
            console.log(`database is listening and node running on port ${port}`);
        }).on('error', (err) => {
            console.log(`Error starting server: ${err}`);
            process.exit(1); // exit the process if there is an error
        });
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    mongodb.closeDb(() => {
        console.log('Database connection closed on app termination');
        process.exit(0);
    });
});
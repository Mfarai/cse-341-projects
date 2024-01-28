const router = require('express').Router();

router.use("/", require("./swagger"));

router.get('/', (req, res) => {
    //#swagger.tags=["hello world"]
    res.send('hello world');
});

router.use('/friends', require('./friends'));

module.exports = router;
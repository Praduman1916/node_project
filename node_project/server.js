const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
const itemRoutes = require('./src/routes/itemRoutes')
const app = express()
app.get('/', (req, res) => {
    res.send("Hi, How are you?")
})
const PORT = 3000
app.use(cors());
app.use(bodyParser.json())
app.use('/items', itemRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;
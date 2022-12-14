const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

require("./routes/router")(app);

app.listen(PORT, function() {
    console.log(`App listening at PORT: ${PORT}`);
})
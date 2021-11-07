//crarea a basic app in express framework
const express = require('express');
const app = express();
const port = 3000;
const router = require("./src/router/scrapper")
const exphbs = require('express-handlebars');
const path = require('path');
const { scrapper } = require('./src/services/scrapper');
const scrapperConfig = require('./src/config');
const { setInterval } = require('timers');

app.set("views",path.join(__dirname, 'src/views'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'scrapper',
    layoutsDir: __dirname + '/src/views/',
    partialsDir: __dirname + '/src/views/'
}));

app.set('view engine', 'hbs');

app.use(router);
app.listen(port, () => {
    scrapper(scrapperConfig)
    setInterval(() => scrapper(scrapperConfig), 1000 * scrapperConfig.interval);
    console.log(`Server running on port ${port}`);
});
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (request, response) => {
    return response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});

const express = require('express');

const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.set('port', process.env.PORT || 3000);

app.listen(port, () => console.log(`Client listening on port ${port}.`));

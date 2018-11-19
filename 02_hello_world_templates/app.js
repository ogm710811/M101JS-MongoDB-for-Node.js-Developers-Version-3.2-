const express = require('express');
const engines = require('consolidate');
const app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
	res.render('hello', { name: 'TEMPLATES' });
});

app.use((req, res) => {
	res.sendStatus(404);
});

const server = app.listen(3000, () => {
	const port = server.address().port;
	console.log(`Express server listening on port %s`, port);
});

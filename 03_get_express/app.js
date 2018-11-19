const express = require('express');
const app = express();

app.get('/:param', (req, res) => {
	const param = req.params.param;
	const queryString = req.query.queryString;
	res.send(`this is the param: ${param} || this is the query strings: ${queryString}`);
});

app.use((req, res) => {
	res.sendStatus(404);
});

const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`Express server listening on port %s`, port);
});

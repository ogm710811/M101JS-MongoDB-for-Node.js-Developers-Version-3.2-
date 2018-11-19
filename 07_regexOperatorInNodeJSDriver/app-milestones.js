const MongoClient = require('mongodb').MongoClient;
const commandLineArgs = require('command-line-args');
const assert = require('assert');

var options = commandLineOptions();

MongoClient.connect('mongodb://localhost:27017/crunchbase', (err, db) => {
	assert.equal(err, null);
	console.log('Successfully connected to MongoDB.');

	const query = queryDocument(options);
	const projection = projectionDocument(options);

	const cursor = db.collection('companies').find(query);
	cursor.project(projection);

	let numMatches = 0;

	cursor.forEach(
		doc => {
			numMatches = numMatches + 1;
			console.log(doc);
		},
		err => {
			assert.equal(err, null);
			console.log('Our query was:' + JSON.stringify(query));
			console.log('Matching documents: ' + numMatches);
			return db.close();
		}
	);
});

function queryDocument(options) {
	console.log(options);

	const query = {};

	if ('overview' in options) {
		query.overview = { $regex: options.overview, $options: 'i' };
	}

	if ('milestones' in options) {
		query['milestones.source_description'] = { $regex: options.milestones, $options: 'i' };
	}

	return query;
}

function projectionDocument(options) {
	const projection = {
		_id: 0,
		name: 1,
		founded_year: 1
	};

	if ('overview' in options) {
		projection.overview = 1;
	}

	if ('milestones' in options) {
		projection['milestones.source_description'] = 1;
	}

	return projection;
}

function commandLineOptions() {
	const cli = commandLineArgs([
		{ name: 'overview', alias: 'o', type: String },
		{ name: 'milestones', alias: 'm', type: String }
	]);

	const options = cli.parse();
	if (Object.keys(options).length <= 1) {
		console.log(
			cli.getUsage({
				title: 'Usage',
				description: 'You must supply at least one option. See below.'
			})
		);
		process.exit();
	}

	return options;
}

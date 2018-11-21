const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const types = [ 'exam', 'quiz', 'homework', 'homework' ];
const records = [];

// if db school is not created it will create it.
MongoClient.connect('mongodb://localhost:27017/school', (err, db) => {
	assert.strictEqual(err, null);
	console.log('Successfully created DB.');
	console.log('Successfully connected to MongoDB.');
	// create collection students
	const cursor = db.collection('students');

	// create 1000 random file of students with scores
	for (i = 0; i < 1000; i++) {
		// take 10 classes
		for (class_counter = 0; class_counter < 10; class_counter++) {
			scores = [];
			// and each class has 4 grades
			for (j = 0; j < 4; j++) {
				scores.push({ type: types[j], score: Math.random() * 100 });
			}

			// there are 500 different classes that they can take
			class_id = Math.floor(Math.random() * 501); // get a class id between 0 and 500

			record = { student_id: i, scores: scores, class_id: class_id };
		}
		records.push(record);
	}
	db.collection('students').insertMany(records, (err, res) => {
		assert.strictEqual(err, null);
		console.log('Number of documents inserted: ' + res.insertedCount);
		db.close();
	});
});

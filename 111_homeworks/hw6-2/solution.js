// solution:
db.grades.aggregate([
	{ $unwind: '$scores' },
	{ $match: { 'scores.type': { $ne: 'quiz' } } },
	{ $group: { _id: { student_id: '$student_id', class_id: '$class_id' }, avg: { $avg: '$scores.score' } } },
	{ $group: { _id: '$_id.class_id', avg: { $avg: '$avg' } } },
	{ $sort: { avg: -1 } },
	{ $limit: 5 }
]);

// other tests:
// 1. get avg for each student, class and type of score (homeworks and exams )
db.grades
	.aggregate([
		{ $unwind: '$scores' },
		{ $match: { 'scores.type': { $ne: 'quiz' } } },
		{
			$group: {
				_id: { student_id: '$student_id', class_id: '$class_id', score_type: '$scores.type' },
				avg: { $avg: '$scores.score' }
			}
		},
		{ $limit: 5 }
	])
	.pretty();

// 2. get avg for each student, class for all type of scores except quizzes
db.grades
	.aggregate([
		{ $unwind: '$scores' },
		{ $match: { 'scores.type': { $ne: 'quiz' } } },
		{ $group: { _id: { student_id: '$student_id', class_id: '$class_id' }, avg: { $avg: '$scores.score' } } },
		{ $limit: 5 }
	])
	.pretty();

// 3. group by class and get avg class for all type of scores except quizzes
db.grades
	.aggregate([
		{ $unwind: '$scores' },
		{ $match: { 'scores.type': { $ne: 'quiz' } } },
		{ $group: { _id: { student_id: '$student_id', class_id: '$class_id' }, avg: { $avg: '$scores.score' } } },
		{ $group: { _id: '$_id.class_id', avg: { $avg: '$avg' } } }
	])
	.pretty();

// 4. sort descending
db.grades
	.aggregate([
		{ $unwind: '$scores' },
		{ $match: { 'scores.type': { $ne: 'quiz' } } },
		{ $group: { _id: { student_id: '$student_id', class_id: '$class_id' }, avg: { $avg: '$scores.score' } } },
		{ $group: { _id: '$_id.class_id', avg: { $avg: '$avg' } } },
		{ $sort: { avg: -1 } }
	])
	.pretty();

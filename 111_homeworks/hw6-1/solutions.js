// solution 1
db.companies
	.aggregate([
		{ $match: { 'relationships.person.permalink': 'eric-di-benedetto' } },
		{ $unwind: '$relationships' },
		{ $match: { 'relationships.person.permalink': 'eric-di-benedetto' } },
		{
			$group: {
				_id: '$relationships.person.permalink',
				companies: { $addToSet: '$name' },
				totalCompanies: { $sum: 1 }
			}
		},
		{ $project: { _id: 1, companies: 1, totaUniqueCompanies: { $size: '$companies' } } }
	])
	.pretty();

// solution 2
db.companies
	.aggregate([
		{ $match: { 'relationships.person.permalink': 'eric-di-benedetto' } },
		{ $project: { relationships: 1, _id: 0, name: 1, permalink: 1 } },
		{ $unwind: '$relationships' },
		{
			$group: {
				_id: { person: '$relationships.person' },
				gross_companies: { $push: '$permalink' },
				unique_companies: { $addToSet: '$permalink' }
			}
		},
		{
			$project: {
				_id: 0,
				person: '$_id.person',
				gross_companies: 1,
				unique_companies: 1,
				unique_number_of_companies: { $size: '$unique_companies' },
				gross_number_of_companies: { $size: '$gross_companies' }
			}
		},
		{ $sort: { unique_number_of_companies: -1 } }
	])
	.pretty();

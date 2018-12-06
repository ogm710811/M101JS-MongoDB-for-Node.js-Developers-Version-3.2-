// solution
db.companies
	.aggregate([
		{ $match: { founded_year: 2004 } },
		{
			$project: {
				_id: 0,
				name: 1,
				funding_rounds: 1,
				num_rounds: { $size: '$funding_rounds' }
			}
		},
		{ $match: { num_rounds: { $gte: 5 } } },
		{
			$project: {
				name: 1,
				avg_round: { $avg: '$funding_rounds.raised_amount' }
			}
		},
		{ $sort: { avg_round: 1 } }
	])
	.pretty();

db.item
	.aggregate([
		{
			$project: {
				_id: 0,
				category: 1,
				num: { $sum: '$category' }
			}
		}
	])
	.pretty();

db.item
	.aggregate([
		{
			$group: {
				_id: { category: '$category' },
				num: { $sum: 1 }
			}
		},
		{ $sort: { _id: 1 } }
	])
	.pretty();

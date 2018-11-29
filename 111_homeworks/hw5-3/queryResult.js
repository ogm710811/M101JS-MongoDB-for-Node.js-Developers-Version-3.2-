db.profile.find({ns: "school2.students" }, { millis: 1, _id: 0 }).sort({ millis: -1 });

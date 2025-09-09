// --- Queries ---
// 1. Display all documents in the 'restaurants' collection.
db.restaurants.find();
// 2. Display the restaurant_id, name, borough, and cuisine for all documents.
db.restaurants.find({}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1
});
// 3. Display the restaurant_id, name, borough, and cuisine, excluding the _id field.
db.restaurants.find({}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 4. Display restaurant_id, name, borough, and zip code, excluding the _id field.
db.restaurants.find({}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "address.zipcode": 1,
  "_id": 0
});
// 5. Display all restaurants located in the Bronx.
db.restaurants.find({
  "borough": "Bronx"
});
// 6. Display the first 5 restaurants in the Bronx.
db.restaurants.find({
  "borough": "Bronx"
}).sort({
  "rating": -1 
}).limit(5);
// 7. Display the next 5 restaurants after skipping the first 5 in the Bronx.
db.restaurants.find({
  "borough": "Bronx"
}).sort({
  "name": 1 
}).skip(5).limit(5);
// 8. Find restaurants that have a score greater than 90.
db.restaurants.find({
  "grades.score": {
    $gt: 90
  }
});
// 9. Find restaurants that have a score greater than 80 but less than 100.
db.restaurants.find({
  "grades.score": {
    $gt: 80,
    $lt: 100
  }
});
// 10. Find restaurants located with a latitude value less than -95.754168.
db.restaurants.find({
  "address.coord.0": {
    $lt: -95.754168
  }
});
// 11. Find restaurants that do not prepare 'American' cuisine,
//     and their grade score is greater than 70, and longitude is less than -65.754168.
db.restaurants.find({
  $and: [{
    "cuisine": {
      $ne: "American "
    }
  }, {
    "grades.score": {
      $gt: 70
    }
  }, {
    "address.coord.0": {
      $lt: -65.754168
    }
  }]
});
// 12. Find restaurants that do not prepare 'American' cuisine,
//     achieved a score greater than 70, and are located at longitude less than -65.754168.
//     Note: Perform this query without using the $and operator.
db.restaurants.find({
  "cuisine": {
    $ne: "American "
  },
  "grades.score": {
    $gt: 70
  },
  "address.coord.0": {
    $lt: -65.754168
  }
});
// 13. Find restaurants that do not prepare 'American' cuisine,
//     and obtained an 'A' grade, and do not belong to Brooklyn.
//     The document should be displayed according to cuisine in descending order.
db.restaurants.find({
  "cuisine": {
    $ne: "American "
  },
  "grades.grade": "A",
  "borough": {
    $ne: "Brooklyn"
  }
}).sort({
  "cuisine": -1
});
// 14. Find restaurant_id, name, borough, and cuisine for restaurants
//     that contain 'Wil' as the first three letters in their name.
db.restaurants.find({
  "name": /^Wil/
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 15. Find restaurant_id, name, borough, and cuisine for restaurants
//     that contain 'ces' as the last three letters in their name.
db.restaurants.find({
  "name": /ces$/
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 16. Find restaurant_id, name, borough, and cuisine for restaurants
//     that contain 'Reg' as three letters anywhere in their name.
db.restaurants.find({
  "name": /Reg/
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 17. Find restaurants that belong to Bronx and prepared either American or Chinese dishes.
db.restaurants.find({
  "borough": { $in: ["Bronx", "BRONX", "bronx"] },
  $or: [{
    "cuisine": { $in: ["American", "American "] }
  }, {
    "cuisine": "Chinese"
  }]
});
// 18. Find restaurant_id, name, borough, and cuisine for restaurants
//     that belong to Staten Island, Queens, Bronx, or Brooklyn.
db.restaurants.find({
  "borough": {
    $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"]
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 19. Find restaurant_id, name, borough, and cuisine for restaurants
//     that do NOT belong to Staten Island, Queens, Bronx, or Brooklyn.
db.restaurants.find({
  "borough": {
    $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"]
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 20. Find restaurant_id, name, borough, and cuisine for restaurants
//     that achieved a score not more than 10.
db.restaurants.find({
  "grades.score": {
    $not: {
      $gt: 10
    }
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 21. Find restaurant_id, name, borough, and cuisine for restaurants
//     that prepare fish except 'American' and 'Chinese' or the restaurant name starts with 'Wil'.
db.restaurants.find({
  $or: [{
    "cuisine": "Seafood "
  }, {
    "name": /^Wil/
  }]
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
});
// 22. Find restaurant_id, name, and grades for restaurants that achieved
//     a grade "A" and a score 11 on ISODate "2014-08-11T00:00:00Z".
db.restaurants.find({
  "grades.date": ISODate("2014-08-11T00:00:00Z"),
  "grades.grade": "A",
  "grades.score": 11
}, {
  "restaurant_id": 1,
  "name": 1,
  "grades": 1,
  "_id": 0
});
// 23. Find restaurant_id, name, and grades for restaurants where the 2nd element
//     of the grades array (index 1) contains a grade of "A" and score 9 on
//     ISODate "2014-08-11T00:00:00Z".
db.restaurants.find({
  "grades.1.date": ISODate("2014-08-11T00:00:00Z"),
  "grades.1.grade": "A",
  "grades.1.score": 9
}, {
  "restaurant_id": 1,
  "name": 1,
  "grades": 1,
  "_id": 0
});
// 24. Find restaurant_id, name, address, and geographical location for restaurants
//     where the second element of the coord array (index 1) contains a value
//     that is greater than 42 and up to 52.
db.restaurants.find({
  "address.coord.1": {
    $gt: 42,
    $lte: 52
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "address": 1,
  "_id": 0
});
// 25. Order restaurant names in ascending order along with all columns.
db.restaurants.find().sort({
  "name": 1

});
// 26. Order restaurant names in descending order along with all columns.
db.restaurants.find().sort({
  "name": -1
});
// 27. Order cuisine name in ascending order and, for the same cuisine borough,
//     order the borough in descending order.
db.restaurants.find().sort({
  "cuisine": 1,
  "borough": -1
});
// 28. Find all addresses that do not contain the 'street' field.
db.restaurants.find({
  "address.street": {
    $exists: false
  }
});
// 29. Select all documents in the restaurants collection where the value of the
//     'coord' field is a Double (BSON type 1).
db.restaurants.find({
  "address.coord": {
    $type: 4
  }
});
// 30. Select restaurant_id, name, and grade for restaurants that return 0 as a
//     remainder after dividing the score by 7.
db.restaurants.find({
  "grades.score": {
    $mod: [7, 0]
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "grades": 1,
  "_id": 0
});
// 31. Find restaurant name, borough, longitude, latitude, and cuisine for restaurants
//     that contain 'mon' as three letters anywhere in their name.
db.restaurants.find({
  "name": /mon/
}, {
  "name": 1,
  "borough": 1,
  "address.coord": 1,
  "cuisine": 1,
  "_id": 0
});
// 32. Find restaurant name, borough, longitude, latitude, and cuisine for restaurants
//     that contain 'Mad' as the first three letters of their name.
db.restaurants.find({
  "name": /^Mad/
}, {
  "name": 1,
  "borough": 1,
  "address.coord": 1,
  "cuisine": 1,
  "_id": 0
});
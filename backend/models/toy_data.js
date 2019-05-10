
// ADD
// curl -X POST -H "Content-Type: application/json" -d '{"food_name":"cookies", "food_qty": 12, "storage_area": "pantry"}' http://localhost:3003/groceries
// curl -X POST -H "Content-Type: application/json" -d '{"food_name":"salsa", "food_qty": 3, "storage_area": "fridge", "expiration_date": "2019-05-12"}' http://localhost:3003/groceries


// DELETE
// curl -X DELETE http://localhost:3003/groceries/5cd5c2c71922254e70f9f817

// UPDATE
// curl -X PUT -H "Content-Type: application/json" -d '{"food_name":"Find One Updated"}' http://localhost:3003/groceries/5cd5c4858826084ecb7a1941
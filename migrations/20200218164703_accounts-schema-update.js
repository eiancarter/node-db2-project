// describes the changes => knex migrate:latest
//car is the VIN, make, model, and mileage
//track transmission type and status of the title (clean, salvage, etc.) - not immediately known
exports.up = function(knex) {

    return knex.schema.createTable("cars", tbl => {

      tbl.increments(); // primary key
  
      tbl
        .string("vin", 256)
        .notNullable()
        .index(); // makes searching by the name faster
  
      tbl.string("make", 128);
      tbl.string("model", 128);
      tbl.decimal("mileage");
  
      // booleans are normally stores as 1 for true and 0 for false
      tbl.boolean("title_status").defaultTo(false);
      tbl.boolean("transmission_type").defaultTo(false);

    });
  };
  
  // how to undo the changes => knex migrate:rollback
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
  };
  
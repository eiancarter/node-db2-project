
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          id: 1, 
          vin: '49839hbg93b95395gh83',
          make: 'ford',
          model: 'f150',
          mileage: 42909,
          title_status: true,
          transmission_type: true
        },
        {
          id: 2, 
          vin: '4983n3bge008b88b0',
          make: 'ferrari',
          model: 'gt',
          mileage: 1102,
          title_status: true,
          transmission_type: true
        },
        {
          id: 3, 
          vin: '894897476497hghg94',
          make: 'maserati',
          model: 'turbo',
          mileage: 3456,
          title_status: true,
          transmission_type: true
        },
      ]);
    });
};

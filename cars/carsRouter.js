const express = require("express");
const db = require('../data/configDB');
const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("cars")
    .where({ id })
    .update(changes)
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      console.log("UPDATE error", err)
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .del()
    .then(count => {
      if(count > 0) {
          res.status(200).json({ message: "the candidate has been deleted" });
      } else {
          res.status(404).json({ message: "candidate cannot be found" });
      }
    })
    .catch(err => {
      console.log("DELETE error", err)
      res.status(500).json({ message: "Failed to delete car" });
    });
});

module.exports = router;

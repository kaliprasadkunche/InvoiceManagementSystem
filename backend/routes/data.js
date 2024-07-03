const express = require('express');
const router = express.Router();
const DataModel = require('../models/Data');

// GET all data
router.get('/', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single data item
router.get('/:id', getData, (req, res) => {
  res.json(res.data);
});

// POST new data
router.post('/', async (req, res) => {
  const newData = new DataModel(req.body);
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update data
router.put('/:id', getData, async (req, res) => {
  try {
    Object.assign(res.data, req.body);
    const updatedData = await res.data.save();
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE data
router.delete('/:id', getData, async (req, res) => {
  try {
    await res.data.remove();
    res.json({ message: 'Deleted data' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getData(req, res, next) {
  let data;
  try {
    data = await DataModel.findById(req.params.id);
    if (data == null) {
      return res.status(404).json({ message: 'Cannot find data' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.data = data;
  next();
}

module.exports = router;

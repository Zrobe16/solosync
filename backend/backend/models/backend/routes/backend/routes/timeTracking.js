const express = require('express');
const router = express.Router();
const pool = require('../models/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM time_entries');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  const { project_id, user_id, start_time, end_time, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO time_entries (project_id, user_id, start_time, end_time, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [project_id, user_id, start_time, end_time, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

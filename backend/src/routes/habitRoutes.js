const router = require('express').Router();
const {habitSchema} = require('../models/schemas');

const habits = [];

router.post('/', (req, res, next) => {
  try {
    const payload = habitSchema.parse(req.body);
    const habit = {...payload, id: `habit_${Date.now()}`, completions: []};
    habits.push(habit);
    res.status(201).json(habit);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/complete', (req, res) => {
  const habit = habits.find(item => item.id === req.params.id);
  if (!habit) {
    return res.status(404).json({message: 'Habit not found'});
  }

  const date = req.body.date;
  if (date && !habit.completions.includes(date)) {
    habit.completions.push(date);
  }

  return res.json(habit);
});

module.exports = router;

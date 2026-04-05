const router = require('express').Router();
const {usageSchema} = require('../models/schemas');
const {calculateProductivityScore} = require('../services/productivityService');

const usageDocs = [];

router.post('/usage', (req, res, next) => {
  try {
    const payload = usageSchema.parse(req.body);
    usageDocs.push(payload);
    res.status(201).json({saved: true});
  } catch (error) {
    next(error);
  }
});

router.get('/report/:userId', (req, res) => {
  const docs = usageDocs.filter(item => item.userId === req.params.userId);
  const totalMinutes = docs.reduce((acc, item) => acc + item.totalMinutes, 0);
  res.json({
    entries: docs.length,
    totalMinutes,
    productivityScore: calculateProductivityScore({
      totalMinutes,
      habitCompletions: 0,
      limitBreaches: 0
    })
  });
});

module.exports = router;

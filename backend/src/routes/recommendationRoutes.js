const router = require('express').Router();
const {buildRecommendations, calculateProductivityScore} = require('../services/productivityService');

router.post('/weekly', (req, res) => {
  const score = calculateProductivityScore(req.body);
  const topDistractors = req.body.topDistractors || [];

  res.json({
    score,
    recommendations: buildRecommendations({score, topDistractors}),
    badges: score > 75 ? ['Consistency Star', 'Deep Work Defender'] : ['Getting Started']
  });
});

module.exports = router;

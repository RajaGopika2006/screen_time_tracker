const router = require('express').Router();

const sessions = [];

router.post('/start', (req, res) => {
  const session = {
    id: `session_${Date.now()}`,
    userId: req.body.userId,
    durationMinutes: req.body.durationMinutes,
    whitelist: req.body.whitelist || [],
    startedAt: new Date().toISOString(),
    isActive: true
  };
  sessions.push(session);
  res.status(201).json(session);
});

router.post('/:id/stop', (req, res) => {
  const session = sessions.find(item => item.id === req.params.id);
  if (!session) {
    return res.status(404).json({message: 'Session not found'});
  }

  session.isActive = false;
  session.stoppedAt = new Date().toISOString();
  return res.json(session);
});

module.exports = router;

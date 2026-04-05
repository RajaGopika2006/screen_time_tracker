const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const {errorHandler} = require('./middleware/errorHandler');
const analyticsRoutes = require('./routes/analyticsRoutes');
const habitRoutes = require('./routes/habitRoutes');
const focusRoutes = require('./routes/focusRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({limit: '1mb'}));

app.get('/health', (_, res) => {
  res.json({status: 'ok', service: 'focusguard-backend'});
});

app.use('/api/analytics', analyticsRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`FocusGuard backend running on :${port}`);
});

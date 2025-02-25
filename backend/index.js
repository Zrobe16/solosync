const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const projectsRoutes = require('./routes/projects');
const timeTrackingRoutes = require('./routes/timeTracking');
const invoicesRoutes = require('./routes/invoices');
const usersRoutes = require('./routes/users');
const subscriptionsRoutes = require('./routes/subscriptions');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to SoloSync API');
});

app.use('/api/projects', projectsRoutes);
app.use('/api/time-tracking', timeTrackingRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SoloSync server running on port ${PORT}`);
});

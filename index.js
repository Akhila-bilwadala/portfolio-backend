const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const projectRoute = require('./routes/project.route.js');
const skillRoute = require('./routes/skill.route.js');
const messageRoute = require('./routes/message.route.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/projects', projectRoute);
app.use('/api/skills', skillRoute);
app.use('/api/messages', messageRoute);
app.use('/api/auth', require('./routes/auth.route.js'));

// home route
app.get('/', (req, res) => {
  res.send("hello from node api update");
});

// MongoDB connect + start server
const { seedAdmin } = require('./controllers/auth.controller.js');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("connected to the database!");
    await seedAdmin();

    app.listen(process.env.PORT || 3000, () => {
      console.log('server is running on port ' + (process.env.PORT || 3000));
    });
  })
  .catch((error) => {
    console.log("connection failed!", error);
  });


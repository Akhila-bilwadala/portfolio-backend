const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Security: Validate critical environment variables at startup
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in .env file.');
  console.error('Please add a strong JWT_SECRET to your .env file before starting the server.');
  process.exit(1);
}

const projectRoute = require('./routes/project.route.js');
const skillRoute = require('./routes/skill.route.js');
const messageRoute = require('./routes/message.route.js');
const cors = require('cors');

const app = express();

// Configure CORS with specific allowed origins
const allowedOrigins = [
  'http://localhost:5500',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501',
  process.env.FRONTEND_URL,
  'https://akhila-bilwadala.vercel.app',
  'https://www.akhila-bilwadala.vercel.app',
  'http://akhila-bilwadala.vercel.app',
  'http://www.akhila-bilwadala.vercel.app',
  // 'https://your-portfolio-domain.com'
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

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

      const url = process.env.RENDER_EXTERNAL_URL;
      if (url) {
        // Render free services sleep after 15 mins of inactivity.
        // This pings the server every 14 mins to keep it awake.
        // RENDER_EXTERNAL_URL is set automatically by Render.
        setInterval(() => require('https').get(url), 14 * 60 * 1000);
      }
    });
  })
  .catch((error) => {
    console.log("connection failed!", error);
  });


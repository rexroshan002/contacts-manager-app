require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const contactsRoutes = require('./routes/contacts.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use('/contacts', contactsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
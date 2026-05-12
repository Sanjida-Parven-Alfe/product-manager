const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const specialOfferRoutes = require('./routes/specialOfferRoutes');

dotenv.config();
connectDB();

console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? 'YES' : 'NO');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/special-offers', specialOfferRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Shelve API running...' });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
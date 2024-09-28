const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const searchRoutes = require('./routes/searchRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', searchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

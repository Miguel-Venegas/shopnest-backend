require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const connectDB = require('./db');

const app = express();
app.get("/health", (req, res) => res.json({ ok: true }));

app.set("trust proxy", 1);
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cookieSession({
  name: "session",
  keys: [process.env.COOKIE_SECRET],
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
}));

// connect to DB
connectDB();

// Routes
app.use('/api/accounts', require('./routes/admin/accounts'));

app.use('/api/products', require('./routes/admin/products'));

app.use('/api/cart', require('./routes/carts'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.js
const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler');
const path = require('path');

const app = express();

// --- Middleware ---
app.use(corsMiddleware);       // CORS
app.use(express.json());       // Body parser

// --- Serve frontend ---
app.use(express.static(path.join(__dirname, '../frontend')));

// --- API routes ---
app.use('/api/books', bookRoutes);

// --- Error handling middleware ---
app.use(errorHandler);

// --- SPA fallback (React/Vue style) ---
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// --- Start server on all network interfaces ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access from LAN: http://192.168.56.2:${PORT}`);
});

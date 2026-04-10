require("dotenv").config();
const express = require("express");
const app = express();

// Load full server configuration
require("./server/app-config")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`ChronoExam Server running on http://localhost:${PORT} 🚀`);
});


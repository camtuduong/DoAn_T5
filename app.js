const express = require('express');
const path = require('path');
const app = express();

// Cổng server
const PORT = 3000;

// Cấu hình thư mục tĩnh
app.use(express.static(path.join(__dirname)));

// Route cơ bản
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Lắng nghe trên cổng
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
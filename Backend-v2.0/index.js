// index.js

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = 3001;  // Use a port that's not in use
app.use(cors());
app.use(express.json());
const teacherRoutes = require('./routes/teacherRoutes');
const contentRoutes = require('./routes/contentRoutes');
const bookRoutes = require('./routes/bookRoutes');
const teacherLogin = require('./routes/teacherLogin');
const adminLogin = require('./routes/adminLogin')
app.use('/api/books', bookRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/teachers', teacherRoutes);

app.use('/api/teacherlogin',teacherLogin);
app.use('/api/adminlogin',adminLogin);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = require('./app');

app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
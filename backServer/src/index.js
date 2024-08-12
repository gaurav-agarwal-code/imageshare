import dotenv from 'dotenv';
import { connectDB } from './db/dbconnect.js';
import { app } from './app.js';

dotenv.config({
  path: "src/.env"
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error);
  });

// src/index.ts
import express from 'express';
import cors from 'cors'
import db from './Db/models/index';
import router from './routes/route';
const app = express();
const port = process.env.PORT || 3222;

app.use(express.json());
app.use(cors());
app.use('/api',router)
app.get('/', (req, res) => {
  res.send('Hello World!');
});
db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error:any) => {
  console.error('Unable to connect to the database:', error);
});

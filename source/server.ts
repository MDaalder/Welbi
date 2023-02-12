import express from 'express';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello Welbi!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

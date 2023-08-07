import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening... on port ${PORT}`);
  console.log(`Version 1 Docs are available on http://localhost:${PORT}/api/docs`);
});
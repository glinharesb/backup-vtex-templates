import express from 'express';
import cors from 'cors';

import fs from 'fs';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send(
    `<h1>Copie o código do arquivo <span style="color: red;">src/console.js</span> e cole no console do navegador.<br>
    Lembre-se de estar com o console aberto no CMS, e com a árvore de pastas dos templates abertas.</h1>`
  );
});

app.post('/', (req, res) => {
  const { folderName, fileName, content } = req.body;

  let error = [];
  if (!folderName) error.push('Missing parameter: folderName');
  if (!fileName) error.push('Missing parameter: fileName');
  if (!content) error.push('Missing parameter: content');

  if (error.length > 0) return res.status(400).json(error);

  const dir = `./dist/${folderName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFile(`${dir}/${fileName}.html`, content, (err) => {
    if (err) {
      console.log('\x1b[31m', `~ File "${fileName}.html" not saved`);
      return res.status(500).json(err);
    }

    console.log('\x1b[32m', `~ File "${fileName}.html" saved!`);
    res.status(200).json(req.body);
  });
});

const port = 3001;
app.listen(port, () => {
  console.log('\x1b[34m', `~ 🚀 Server listening on: http://localhost:${port}`);
});

import fs from 'fs';
import fastify from 'fastify';
import path from 'path';

const text = fs.readFileSync('./words.csv', { encoding: 'ascii' });
const words = text.replaceAll('\n', '').split(',');
const app = fastify({ logger: true });
const htmlDir = path.join(__dirname, 'index.html');

console.log(`Found ${words.length} words in words.csv file\n`);

app.get('/', (req, res) => {
    const html = fs.readFileSync(htmlDir, { encoding: 'utf-8' });
    res.type('text/html').send(html);
});

app.get('/word', (req, res) => {
    const randomNumber = Math.floor(Math.random() * words.length);
    res.send(words[randomNumber].replaceAll('"', ''));
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});

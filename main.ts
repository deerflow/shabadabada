import fs from 'fs';
import fastify from 'fastify';
import path from 'path';

const text = fs.readFileSync('./words.csv', { encoding: 'ascii' });
const sentences = text
    .replaceAll('\n', '')
    .split(',')
    .map(sentence => sentence.replaceAll('"', ''));
const app = fastify({ logger: true });
const htmlDir = path.join(__dirname, 'index.html');

console.log(`Found ${sentences.length} words/sentences in words.csv file\n`);

app.get('/', (req, res) => {
    const html = fs.readFileSync(htmlDir, { encoding: 'utf-8' });
    res.type('text/html').send(html);
});

app.get('/sentences', (req, res) => {
    res.type('application/json').send(sentences);
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});

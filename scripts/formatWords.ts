import fs from 'fs';
import path from 'path';

const sentencesPath = path.join(__dirname, '../src/words.csv');

const text: string = fs.readFileSync(sentencesPath, { encoding: 'utf8' });
const sentences = text
    .replaceAll('\n', '')
    .replaceAll('" ', '"')
    .replaceAll(' "', '"')
    .split(',')
    .map(sentence => sentence.replaceAll(',', ''))
    .map(sentence => sentence.toLowerCase());

const finalWordList = [...new Set(sentences)];

fs.writeFileSync(sentencesPath, finalWordList.join(',\n'));

console.log(`Formatted word list, ${finalWordList.length} entries`);

const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const noteTopics = require('../_data/noteTopics.json');
const { validateNotes } = require('./site-utils');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const notes = walk('notes').filter(file => file.endsWith('.md')).map(inputPath => ({
  inputPath,
  data: matter(fs.readFileSync(inputPath, 'utf8')).data,
}));

validateNotes(notes, noteTopics);
console.log(`Validated metadata for ${notes.length} Notes source files.`);

module.exports = () => JSON.parse(require('node:fs').readFileSync('online-judge/progress-data.json', 'utf8'));

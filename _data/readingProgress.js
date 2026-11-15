const {records} = require('./toeicReading.json');
module.exports = () => {
  const tests = records.map(test => {
    if (!test.sections.length) return {...test, recorded: false};
    const sections = test.sections.map(section => {
      if (!Number.isInteger(section.total) || !Number.isInteger(section.incorrect) || section.total <= 0 || section.incorrect < 0 || section.incorrect > section.total) throw new Error('Invalid reading result');
      const correct = section.total - section.incorrect;
      return {...section, correct, accuracy: (100 * correct / section.total).toFixed(1)};
    });
    const total = sections.reduce((sum, s) => sum + s.total, 0);
    const correct = sections.reduce((sum, s) => sum + s.correct, 0);
    return {...test, sections, recorded: true, total, correct, incorrect: total - correct, accuracy: (100 * correct / total).toFixed(0)};
  });
  const completed = tests.filter(test => test.recorded);
  return {tests, completed: completed.length, latest: completed.at(-1), first: tests[0]};
};

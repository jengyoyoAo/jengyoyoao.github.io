// Only build output is removed; content and original code stay untouched.
require('node:fs').rmSync(require('node:path').resolve('_site'), {recursive:true,force:true});

const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if(file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let count = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace text-white that is not preceded by dark:
  // It matches text-white followed by a space, quote, or backtick
  content = content.replace(/(?<!dark:)text-white(?=[\s"'`])/g, 'text-black dark:text-white');
  
  // Replace text-neutral-300 or text-neutral-400 not preceded by dark:
  content = content.replace(/(?<!dark:)text-neutral-[34]00(?=[\s"'`])/g, (match) => {
    return 'text-neutral-600 dark:' + match;
  });

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Fixed ' + f);
    count++;
  }
});

console.log('Total files modified: ' + count);

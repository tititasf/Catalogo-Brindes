const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      const safeReplacements = [
        { regex: /(?<!dark:)\bbg-black(\/[0-9]+)?\b/g, repl: 'bg-white$1 dark:bg-black$1' },
        { regex: /(?<!dark:)\bbg-neutral-950(\/[0-9]+)?\b/g, repl: 'bg-neutral-50$1 dark:bg-neutral-950$1' },
        { regex: /(?<!dark:)\bbg-neutral-900(\/[0-9]+)?\b/g, repl: 'bg-neutral-100$1 dark:bg-neutral-900$1' },
        { regex: /(?<!dark:)\bbg-neutral-800(\/[0-9]+)?\b/g, repl: 'bg-neutral-200$1 dark:bg-neutral-800$1' },
        
        { regex: /(?<!dark:)\btext-white(\/[0-9]+)?\b/g, repl: 'text-black$1 dark:text-white$1' },
        { regex: /(?<!dark:)\btext-neutral-400(\/[0-9]+)?\b/g, repl: 'text-neutral-600$1 dark:text-neutral-400$1' },
        { regex: /(?<!dark:)\btext-neutral-300(\/[0-9]+)?\b/g, repl: 'text-neutral-700$1 dark:text-neutral-300$1' },
        
        { regex: /(?<!dark:)\bborder-white(\/[0-9]+)?\b/g, repl: 'border-black$1 dark:border-white$1' },
        { regex: /(?<!dark:)\bborder-neutral-800(\/[0-9]+)?\b/g, repl: 'border-neutral-200$1 dark:border-neutral-800$1' },
        { regex: /(?<!dark:)\bborder-neutral-900(\/[0-9]+)?\b/g, repl: 'border-neutral-100$1 dark:border-neutral-900$1' },
        
        { regex: /(?<!dark:)\bhover:bg-neutral-800(\/[0-9]+)?\b/g, repl: 'hover:bg-neutral-200$1 dark:hover:bg-neutral-800$1' },
        { regex: /(?<!dark:)\bhover:bg-neutral-900(\/[0-9]+)?\b/g, repl: 'hover:bg-neutral-100$1 dark:hover:bg-neutral-900$1' },
        { regex: /(?<!dark:)\bhover:text-white(\/[0-9]+)?\b/g, repl: 'hover:text-black$1 dark:hover:text-white$1' },
        { regex: /(?<!dark:)\bhover:border-white(\/[0-9]+)?\b/g, repl: 'hover:border-black$1 dark:hover:border-white$1' },
        { regex: /(?<!dark:)\bhover:bg-black(\/[0-9]+)?\b/g, repl: 'hover:bg-white$1 dark:hover:bg-black$1' },
      ];

      safeReplacements.forEach(({ regex, repl }) => {
        content = content.replace(regex, repl);
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  });
}

processDirectory(directoryPath);

const { execSync } = require('child_process');
const fs = require('fs');

const components = [
  "ProjectsSection",
  "SkillsSection",
  "AboutSection",
  "ContactsSection",
  "Quote"
];

const newComponents = [
  "Hero",
  "ScrollReveal"
];

for (const comp of components) {
  // Fetch tsx
  let tsx = execSync(`git show light-theme-redesign:src/components/${comp}.tsx`, { encoding: 'utf8' });
  // Update internal imports and component name
  tsx = tsx.replace(new RegExp(`'./${comp}.module.css'`, 'g'), `'./${comp}Light.module.css'`);
  tsx = tsx.replace(new RegExp(`"./${comp}.module.css"`, 'g'), `"./${comp}Light.module.css"`);
  tsx = tsx.replace(`export default async function ${comp}()`, `export default async function ${comp}Light()`);
  tsx = tsx.replace(`export default function ${comp}()`, `export default function ${comp}Light()`);
  
  fs.writeFileSync(`src/components/${comp}Light.tsx`, tsx, 'utf8');
  
  // Fetch css
  const css = execSync(`git show light-theme-redesign:src/components/${comp}.module.css`, { encoding: 'utf8' });
  fs.writeFileSync(`src/components/${comp}Light.module.css`, css, 'utf8');
}

for (const comp of newComponents) {
  try {
      const tsx = execSync(`git show light-theme-redesign:src/components/${comp}.tsx`, { encoding: 'utf8' });
      fs.writeFileSync(`src/components/${comp}.tsx`, tsx, 'utf8');
  } catch(e) {}
  
  try {
      const css = execSync(`git show light-theme-redesign:src/components/${comp}.module.css`, { encoding: 'utf8' });
      fs.writeFileSync(`src/components/${comp}.module.css`, css, 'utf8');
  } catch(e) {}
}

console.log("Files successfully created in UTF-8.");

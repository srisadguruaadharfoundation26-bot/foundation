// One-time conversion of captured reference markup into editable React components.
import fs from 'node:fs';
const home = JSON.parse(fs.readFileSync('reference-home.json', 'utf8'));
const jsx = html => html
  .replace(/ class=/g, ' className=')
  .replace(/<(img|br)(\s[^>]*?)?>/g, '<$1$2 />')
  .replace(/rel="noopener"/g, 'rel="noopener noreferrer"')
  .replace(/(<a[^>]*target="_blank"[^>]*)(>)/g, (match, tag) => tag.includes('rel=') ? match : tag + ' rel="noopener noreferrer">');
fs.mkdirSync('src/components', {recursive:true});
fs.mkdirSync('src/pages', {recursive:true});
const sections = Object.fromEntries(['about','services','healthcare','gallery','contact'].map(name => [name, home.main.match(new RegExp(`<section class="section ${name}"[^>]*>[\\s\\S]*?</section>`))[0]]));
for (const [name, html] of Object.entries(sections)) {
  const component = name[0].toUpperCase()+name.slice(1)+'Section';
  let markup = jsx(html);
  let extra = '';
  let props = '';
  if (name==='gallery') {
    extra = '';
    props = '{ onOpenImage }';
    markup = markup.replace(/(<button className="gallery-item" data-image="([^"]+)" data-caption="([^"]+)" (?=>))/g,'$1');
    markup = markup.replace(/<button className="gallery-item" data-image="([^"]+)" data-caption="([^"]+)">/g, (_,src,caption)=>`<button className="gallery-item" onClick={() => onOpenImage({src: '${src}', caption: '${caption.replaceAll('&amp;', '&')}'})}>`);
  }
  fs.writeFileSync(`src/components/${component}.jsx`, `import React from 'react';\n${extra}export default function ${component}(${props}) {\n  return (${markup.replace(/></g,'>\n<')});\n}\n`);
}
for (const page of ['home','about','services','gallery','contact']) {
  const captured = JSON.parse(fs.readFileSync(`reference-${page}.json`,'utf8'));
  let markup = captured.main;
  const used = [];
  for (const [name, html] of Object.entries(sections)) {
    if (markup.includes(html)) {
      const component = name[0].toUpperCase()+name.slice(1)+'Section';
      used.push(component);
      markup = markup.replace(html, `<${component}${name==='gallery'?' onOpenImage={onOpenImage}':''} />`);
    }
  }
  if (markup.includes('class="donate section"')) {
    markup = markup.replace(/<section class="donate section"[\s\S]*?<\/section>/g, '<DonationSection />');
    used.push('DonationSection');
  }
  const title = page[0].toUpperCase()+page.slice(1)+'Page';
  fs.writeFileSync(`src/pages/${title}.jsx`, `import React from 'react';\n${used.map(c=>`import ${c} from '../components/${c}';`).join('\n')}\nexport default function ${title}({onOpenImage}) {\n  return (${jsx(markup).replace(/></g,'>\n<')});\n}\n`);
}
let css = home.css.replace(/^@import[^\n]+\n/, '');
fs.writeFileSync('src/style.css', `@font-face{font-family:'DM Sans';font-style:normal;font-weight:100 1000;font-display:swap;src:url('../public/assets/dm-sans.woff2') format('woff2')}\n@font-face{font-family:'Manrope';font-style:normal;font-weight:200 800;font-display:swap;src:url('../public/assets/manrope.woff2') format('woff2')}\n` + css);

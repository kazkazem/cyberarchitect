import {readFile,mkdir,writeFile,copyFile,unlink} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {renderPage,home,toolsPage,productPage,secondaryPage} from '../src/render.mjs';
import {validateProduct} from '../src/catalog.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
export async function buildSite({outputDir=path.join(root,'dist'),products:providedProducts}={}) {
 const products=providedProducts??JSON.parse(await readFile(path.join(root,'content/products.json'),'utf8'));
 const site=JSON.parse(await readFile(path.join(root,'content/site.json'),'utf8'));
 for(const p of products){const errors=validateProduct(p);if(errors.length)throw Error(errors.join(', '))}
 const slugs=products.map(p=>p.slug);if(new Set(slugs).size!==slugs.length)throw Error('Duplicate product slug');
 const pages=[['','Workflow, considered.',home(products)],['tools','The collection',toolsPage(products)]];
 for(const key of ['workflow','work','journal','about','contact'])pages.push([key,({workflow:'Our approach',work:'In practice',journal:'Journal',about:'About Kaz',contact:'Let’s talk'})[key],secondaryPage(key,site)]);
 for(const key of ['audit-before-automation','studio-preview'])pages.push([`journal/${key}`,key==='studio-preview'?'A first look':'Audit before automation',secondaryPage(key,site)]);
 for(const p of products)pages.push([`tools/${p.slug}`,p.title,productPage(p)]);
 const generated=pages.map(([route])=>route?route+'/index.html':'index.html');
 let previous=[];try{previous=JSON.parse(await readFile(path.join(outputDir,'.generated-files.json'),'utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
 const base=path.resolve(outputDir);
 for(const file of previous){if(generated.includes(file))continue;const target=path.resolve(base,file);if(!target.startsWith(base+path.sep)||!file.endsWith('/index.html'))continue;await unlink(target).catch(e=>{if(e.code!=='ENOENT')throw e})}
 for(const [route,title,body] of pages){const dir=path.join(outputDir,route);await mkdir(dir,{recursive:true});await writeFile(path.join(dir,'index.html'),renderPage({title,path:`/${route}/`,body,site}))}
 await mkdir(path.join(outputDir,'assets'),{recursive:true});
 for(const file of ['styles.css','interactions.js'])await copyFile(path.join(root,'src',file),path.join(outputDir,'assets',file));
 await writeFile(path.join(outputDir,'assets/favicon.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#641f35"/><text x="14" y="47" fill="#f4f0e7" font-family="Georgia" font-size="50">c</text></svg>');
 await writeFile(path.join(outputDir,'404.html'),renderPage({title:'Page not found',path:'/404',site,body:'<section class="page-intro"><p class="eyebrow">404</p><h1>A different<br>direction.</h1><p>This page does not exist. <a class="text-link" href="/">Return to the studio ↗</a></p></section>'}));
 await writeFile(path.join(outputDir,'.generated-files.json'),JSON.stringify(generated));
 return pages.length;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url)console.log(`Built ${await buildSite()} pages.`);

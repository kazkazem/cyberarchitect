import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,readFile,readdir,stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { buildSite } from '../scripts/build.mjs';
import {card,productPage} from '../src/render.mjs';
test('released product detail and card show actual release status and compatibility',()=>{
 const p={slug:'released',title:'Released',category:'Data',description:'Example',features:[],art:'room',availability:'released',distribution:'free',packageVerified:true,version:'1.0',releaseDate:'2026-10-20',testedVersions:['2022'],releaseUrl:'https://example.com/release'};
 assert.doesNotMatch(card(p),/In development/);
 const html=productPage(p);
 assert.match(html,/2022/);
 assert.match(html,/1\.0/);
 assert.doesNotMatch(html,/In development|To be announced/);
});
test('rebuild removes previously generated pages for withdrawn products',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'cyberarchitect-test-'));
 await buildSite({outputDir:dir});
 await buildSite({outputDir:dir,products:[]});
 await assert.rejects(readFile(path.join(dir,'tools/room-packs/index.html')), {code:'ENOENT'});
});
test('built pages have real destinations and no private records or invented contact',async()=>{
  const dir=await mkdtemp(path.join(tmpdir(),'cyberarchitect-test-'));
  await buildSite({outputDir:dir});
  for(const route of ['','workflow','tools','work','journal','about','contact','tools/room-packs','tools/schedule-link','tools/export-packages']){
    const html=await readFile(path.join(dir,route,'index.html'),'utf8');
    assert.match(html,/<title>/);
    assert.doesNotMatch(html,/mailto:|VISA-CHECKLIST|EVIDENCE-REGISTER|Toby Neilson|Fabbine Taj|C:\\Users/);
    for(const [,href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)){
      const file=path.join(dir,href.endsWith('/')?href+'index.html':href);
      assert.ok((await stat(file)).isFile(),`Missing local destination ${href}`);
    }
  }
  const pages=await readdir(path.join(dir,'tools'));
  assert.ok(!pages.includes('unknown'));
  const contact=await readFile(path.join(dir,'contact/index.html'),'utf8');
  assert.match(contact,/not open yet/i);
});

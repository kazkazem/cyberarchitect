import {test} from 'node:test';
import assert from 'node:assert/strict';
import {catProductPage,catAccessPage,catLicencesPage} from '../src/cat.mjs';
import {mkdtemp,readFile,stat} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {buildSite} from '../scripts/build.mjs';

test('CAT policy includes shared launch, funding, free grace, permanent closure and paid licence protection',()=>{
 for(const html of [catProductPage(),catAccessPage()]) {
  for(const phrase of ['100 initial free days','£25','24 hours','pro rata','10-day FREE grace period','closes permanently','Later contributions do not reopen','Existing valid individual and office paid licences remain valid']) assert.ok(html.includes(phrase),phrase);
  assert.match(html,/payments and (?:the )?service are not live/i);
  assert.doesNotMatch(html,/<form|<input|<button|href="https?:|data-countdown|download=/i);
 }
 assert.match(catAccessPage(),/not a separate 100-day trial/);
 assert.match(catAccessPage(),/confirmed £12\.50 adds 12 hours/);
});

test('CAT draft routes and their links build without exposing private handover details',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'cat-policy-'));
 await buildSite({outputDir:dir});
 for(const route of ['cat','cat/access','cat/licences']) {
  const html=await readFile(path.join(dir,route,'index.html'),'utf8');
  assert.doesNotMatch(html,/C:\\Users|owner token|01a187e6|cat-licenses-v1/);
  for(const [,href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) assert.ok((await stat(path.join(dir,href.endsWith('/')?href+'index.html':href))).isFile(),href);
 }
});

test('unconnected licence hub collects no keys and offers no simulated account actions',()=>{
 const html=catLicencesPage();
 assert.match(html,/Licence service connection pending/);
 assert.match(html,/Individual keys bind to one installation/);
 assert.match(html,/12-hour deadline/);
 assert.doesNotMatch(html,/<form|<input|<button|href="https?:|localStorage|sessionStorage/);
});

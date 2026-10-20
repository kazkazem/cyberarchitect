import {test} from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {resolveRequestPath} from '../scripts/paths.mjs';
test('preview resolves root and pages with a trailing separator without rejecting them',()=>{
 const root=path.resolve('site')+path.sep;
 assert.equal(resolveRequestPath(root,'/'),path.resolve('site'));
 assert.equal(resolveRequestPath(root,'/tools/'),path.resolve('site/tools'));
 assert.equal(resolveRequestPath(root,'/../private'),null);
});

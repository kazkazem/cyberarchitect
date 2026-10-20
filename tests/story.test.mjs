import {test} from 'node:test';
import assert from 'node:assert/strict';
import {roomStory,storyStrip} from '../src/story.mjs';
test('room story connects three named controls to panels and explains its verification boundary',()=>{const html=roomStory();for(let i=0;i<3;i++){assert.ok(html.includes(`aria-controls="room-stage-${i}"`));assert.ok(html.includes(`id="room-stage-${i}"`))}assert.equal((html.match(/data-story-panel="\d" hidden/g)||[]).length,2);assert.match(html,/Live plugin demonstration still to come/);assert.match(html,/<noscript>/);for(const kind of ['room','schedule','export'])assert.match(storyStrip(kind),/Intended result/)});

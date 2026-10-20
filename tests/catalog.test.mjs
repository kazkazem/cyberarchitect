import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getProductAction, filterProducts, validateProduct } from '../src/catalog.mjs';

const released = {slug:'example', title:'Example', availability:'released', distribution:'free', packageVerified:true, version:'1.0', releaseDate:'2026-10-20', testedVersions:['2022'], releaseUrl:'https://example.com/release'};
test('development tools cannot expose a download even with a destination', () => {
  assert.equal(getProductAction({...released, availability:'development'}).href, null);
});
test('free releases require complete release evidence', () => {
  assert.equal(getProductAction(released).kind, 'download');
  for (const key of ['packageVerified','version','releaseDate','releaseUrl']) assert.equal(getProductAction({...released,[key]:null}).href,null);
  assert.equal(getProductAction({...released,testedVersions:[]}).href,null);
  assert.equal(getProductAction({...released,releaseUrl:'javascript:alert(1)'}).href,null);
});
test('paid releases need verified seller, licence and fulfilment', () => {
  const paid = {...released,distribution:'paid',checkoutUrl:'https://example.com/pay',priceLabel:'£20',licenceUrl:'https://example.com/licence',sellerVerified:true,fulfilmentVerified:true};
  assert.equal(getProductAction(paid).kind,'buy');
  for(const key of ['checkoutUrl','priceLabel','licenceUrl','sellerVerified','fulfilmentVerified']) assert.equal(getProductAction({...paid,[key]:null}).href,null);
});
test('unknown filters produce empty results and reset restores all',()=>{
  const products=[released,{...released,slug:'second',distribution:'paid'}];
  assert.equal(filterProducts(products,{distribution:'missing'}).length,0);
  assert.equal(filterProducts(products,{}).length,2);
});
test('invalid slugs cannot become output paths',()=>{
  assert.ok(validateProduct({...released,slug:'../../private'}).length);
});

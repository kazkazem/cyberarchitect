const https = value => { try { return new URL(value).protocol === 'https:'; } catch { return false; } };
export function validateProduct(p) {
  const errors=[];
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) errors.push('Invalid slug');
  if(!p.title) errors.push('Missing title');
  if(!['development','released'].includes(p.availability)) errors.push('Invalid availability');
  return errors;
}
export function getProductAction(p) {
  const unavailable={kind:'unavailable',label:'In development',href:null};
  if(p.availability!=='released' || p.packageVerified!==true || !p.version || !p.releaseDate || !p.testedVersions?.length) return unavailable;
  if(p.distribution==='free' && https(p.releaseUrl)) return {kind:'download',label:'Download free',href:p.releaseUrl};
  if(p.distribution==='paid' && https(p.checkoutUrl) && https(p.licenceUrl) && p.priceLabel && p.sellerVerified===true && p.fulfilmentVerified===true)
    return {kind:'buy',label:`Buy · ${p.priceLabel}`,href:p.checkoutUrl};
  return unavailable;
}
export function filterProducts(products,filters={}) {
  return products.filter(p=>Object.entries(filters).every(([key,value])=>!value || value==='all' || p[key]===value));
}

import path from 'node:path';
export function resolveRequestPath(root,pathname) {
 const base=path.resolve(root);
 const target=path.resolve(base,'.'+pathname);
 return target===base||target.startsWith(base+path.sep)?target:null;
}

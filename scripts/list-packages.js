import fs  from 'fs-extra';
import globby  from 'glob';
import path  from 'path';
import { getPackages } from '@lerna/project'


const pkgs = await getPackages();
const list = pkgs.map(pkg => {
    return {
        path: `./packages/${pkg.name}/web`
    }
})
  

fs.writeFileSync('./list.txt', JSON.stringify(list), 'utf8');

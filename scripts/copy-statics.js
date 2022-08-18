const ncp = require('ncp').ncp;
const fs = require('fs-extra');
const globby = require('glob');
const path = require('path');
const { getPackages } = require('@lerna/project');
ncp.limit = 16;

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const copyFolders = async () => {
  //   const list = getDirectories(path.resolve('packages'));
  const pkgs = await getPackages();
  const pkgsLocations = pkgs.map(pkg => pkg.location);
  pkgsLocations.forEach(pkgLocation => {
    console.log(pkgLocation);
    const staticsPath = `${pkgLocation}/statics`;
    if (fs.existsSync(staticsPath)) {
      ncp(staticsPath, staticsPath.replace('statics', 'dist'), err => {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
      });
      //   console.log(staticsPath, staticsPath.replace('statics', 'dist/statics'));
    }
  });
};

copyFolders();
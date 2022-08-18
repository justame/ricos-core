/* eslint-disable no-console */
import child_process from 'child_process';
import chalk from 'chalk';
import { getPackages } from '@lerna/project';
import fs from 'fs-extra';
import  OS from 'os';
const EOL = OS.EOL;


const {execSync }= child_process;

const publishCommand = (pkg, tag) =>
  `npm publish  --access=public ${pkg.path} --registry=${pkg.registry}`;
// const addNextTagCmd = pkg =>
//   `npm dist-tag --registry=${pkg.registry} add ${pkg.name}@${pkg.version} ${pkgUtils.NEXT_TAG}`;

function shouldPublishPackage(pkg) {
  // const remoteVersionsList = pkgUtils.getPublishedVersions(pkg);
  // return !remoteVersionsList.includes(pkg.version);
  return true;
}

function publish(pkg) {
  const { name, version } = pkg;
  const publishCmd = publishCommand(pkg, '');
  console.log(chalk.magenta(`Running: "${publishCmd}" for ${name}@${version}`));
  execSync(publishCmd, { stdio: 'inherit' });
  // if (pkgUtils.isLatest(tag)) {
  //   // const addTagCmd = addNextTagCmd(pkg);
  //   console.log(chalk.magenta(`adding: adding next tag to latest: "${addTagCmd}"`));
  //   execSync(addTagCmd, { stdio: 'inherit' });
  // }
  return true;
}

function release(pkg) {
  console.log(`\nStarting the release process for ${chalk.bold(pkg.name)}`);

  if (!shouldPublishPackage(pkg)) {
    console.log(
      chalk.blue(`${pkg.name}@${pkg.version} already exists on registry ${pkg.registry}`)
    );
    console.log('No publish performed');
    return;
  }

  const published = publish(pkg);
  if (published) {
    console.log(
      chalk.green(`Published "${pkg.name}@${pkg.version}" succesfully to ${pkg.registry}`)
    );
  } else {
    console.log('No publish performed');
  }
}

function createNpmRc() {
  execSync(`rm -f package-lock.json`);
  const NPM_EMAIL = 'justame@gmail.com'
  const NPM_TOKEN = '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';
  const content = `email=${NPM_EMAIL}${EOL}//registry.npmjs.org/:_authToken=${NPM_TOKEN}${EOL}`;

  fs.writeFileSync(`.npmrc`, content);
}

function publishPackages() {
  getPackages()
    .then(allPackages => {
      const packages = allPackages.filter(pkg => !pkg.private)
      packages.forEach(pkg =>
        release({
          name: pkg.name,
          version: pkg.version,
          registry: pkg.get('publishConfig').registry,
          path: pkg.location,
        })
      );
      //   require('axios')
      //     .post('https://www.wix.com/_serverless/loki-update-service2/trigger-loki', {
      //       packages,
      //     })
      //     .then(res => {
      //       console.log(JSON.stringify(res.data, null, 2));
      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });
    })
    .catch(e => {
      console.error('Error in publish script', e);
      process.exit(1);
    });
}

createNpmRc();
publishPackages();

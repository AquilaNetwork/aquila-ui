const fs = require('fs')

const uiPackageFilePath = 'package.json';
const uiPackageFile = fs.readFileSync(uiPackageFilePath, 'utf8');
const uiPackage = JSON.parse(uiPackageFile);

const corePackageFilePath = './aquila-ui-core/package.json';
const corePackageFile = fs.readFileSync(corePackageFilePath, 'utf8');
const corePackage = JSON.parse(corePackageFile);

const cryptoPackageFilePath = './aquila-ui-crypto/package.json';
const cryptoPackageFile = fs.readFileSync(cryptoPackageFilePath, 'utf8');
const cryptoPackage = JSON.parse(cryptoPackageFile);

const pluginsPackageFilePath = './aquila-ui-plugins/package.json';
const pluginsPackageFile = fs.readFileSync(pluginsPackageFilePath, 'utf8');
const pluginsPackage = JSON.parse(pluginsPackageFile);

uiPackage.dependencies = {
    ...uiPackage.dependencies,
    "aquila-ui-core": corePackage.version,
    "aquila-ui-crypto": cryptoPackage.version,
    "aquila-ui-plugins": pluginsPackage.version
}

console.log(uiPackage.dependencies);

fs.writeFileSync(uiPackageFilePath, JSON.stringify(uiPackage, null, 2));
console.log('Package.Json updated');

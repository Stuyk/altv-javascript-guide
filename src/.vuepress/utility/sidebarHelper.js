const glob = require('glob');
const path = require('path');

const workingPath = path.join(process.cwd(), '/src/'); // ./src/

/**
 * @param  {} targetDirectory /en/introduction/
 * @param  {} callback
 */
function buildSidebar(targetDirectory) {
    const fullPath = path.join(workingPath, targetDirectory);
    const files = glob.sync(fullPath + '/**/*.md');

    for (let i = 0; i < files.length; i++) {
        let fileName = files[i];
        fileName = fileName.replace(/\//gi, '\\');
        fileName = fileName.replace(workingPath, '\\');
        fileName = fileName.replace('README.md', '');
        fileName = fileName.replace('.md', '');
        fileName = fileName.replace(/\\/gi, '/');
        files[i] = fileName;
    }

    files.reverse();
    return files;
}

module.exports = {
    buildSidebar
};

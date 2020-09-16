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
        fileName = fileName.replace(/.*src/gi, '');
        fileName = fileName.replace('.md', '');
        files[i] = fileName;
    }

    // Make ReadMe First
    const index = files.findIndex(file => file.includes('README'));
    files.splice(index, 1);
    files.unshift(targetDirectory);
    return files;
}

module.exports = {
    buildSidebar
};

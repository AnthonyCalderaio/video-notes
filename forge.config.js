const path = require('path');
const fs = require('fs')

console.log("Forge configuration is being loaded...");

module.exports = {
  packagerConfig: {
    ignore: [
      'src/',       // Ignore the 'src' folder
      'node_modules',
      '.git/',        // Ignore git
      '.vscode/', 
      '.angular/',
      'forge.config.js',
      'release/'
    ],
    asar: false,
    strip: false,
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO',
      },
    },
  ],
  // Hooks for debugging
  //   hooks: {
  //   prePackage: async (forgeConfig, options) => {
  //     const rootDir = options.dir || process.cwd();
  //     console.log("Packing from directory:", rootDir);

  //     const files = fs.readdirSync(rootDir, { withFileTypes: true })
  //       .map(dirent => `${dirent.name} - ${dirent.isDirectory() ? 'Directory' : 'File'}`);
  //     console.log("Files to be packaged:", files);
  //   },
  // }
};

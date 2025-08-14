// console.log("Hello");
// console.log(global);

// Common core modules
const os = require('os');
const path = require('path');

// OS information
console.log("OS Type:", os.type()); 
console.log("OS Version:", os.version());

// Home directory
console.log("Home Directory:", os.homedir()); 

// Other values we can access in Node.js
// Current directory name
console.log("Directory Name:", __dirname);

// Current file name
console.log("File Name:", __filename);
console.log("Directory Name:", path.dirname(__filename));
console.log("Base File Name:", path.basename(__filename));
console.log("Extension Name:", path.extname(__filename));

// Returns an object with detailed information about the file path
console.log(path.parse(__filename));
console.log(path.parse(__filename).name);

// Output:
// $ node server
// OS Type: Windows_NT
// OS Version: Windows 10 Home Single Language
// Home Directory: C:\Users\Ashishpaul
// Directory Name: C:\Users\Ashishpaul\Desktop\Node Js\01-Introduction
// File Name: C:\Users\Ashishpaul\Desktop\Node Js\01-Introduction\server.js
// Directory Name: C:\Users\Ashishpaul\Desktop\Node Js\01-Introduction
// Base File Name: server.js
// Extension Name: .js
// {
//   root: 'C:\\',
//   dir: 'C:\\Users\\Ashishpaul\\Desktop\\Node Js\\01-Introduction',
//   base: 'server.js',
//   ext: '.js',
//   name: 'server'
// }
// server

// We can also install and use packages created by other developers from npm.
// NPM stands for Node Package Manager.
// We can also create our own custom modules.

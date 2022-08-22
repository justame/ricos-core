/*
 This is a helper script that can be used to recursively rename all
 JavaScript files within a given directory into TypeScript files.
 call:
 node renamer <directory>
 */

import fs  from 'fs-extra';
import path  from 'path';
import prependFile from 'prepend-file';

 const ANSI_GREEN = '\x1b[32m';
 const ANSI_DEFAULT = '\x1b[0m';
 const ANSI_RED = '\x1b[35m';

 function rename(dir, file, renamed){
   fs.rename(path.join(dir, file), path.join(dir, renamed), err => {
     err ? console.log(err) : null;
     prependFile(path.join(dir, renamed), `//@ts-nocheck\n`);
   });
 }
 
 // eslint-disable-next-line no-var
 var walkSync = function(dir, filelist) {
   const files = fs.readdirSync(dir);
   filelist = filelist || [];
   console.log('filelist',filelist,dir)
   files.forEach(file => {
     if (fs.statSync(path.join(dir, file)).isDirectory()) {
       filelist = walkSync(path.join(dir, file), filelist);
     } else if (getFileExtension(file) === 'js' || getFileExtension(file) === 'jsx') {
       let renamed;
       if (getFileExtension(file) === 'js') {
         renamed = file.slice(0, -3) + '.tsx';
       } else if (getFileExtension(file) === 'jsx') {
         renamed = file.slice(0, -4) + '.tsx';
       }
       // prependFile(path.join(dir, file), `//@ts-nocheck\n`);
       rename(dir,file,renamed);
     }
   });
   return filelist;
 };
 
 
 
 // eslint-disable-next-line no-var
 var getFileExtension = function(file) {
   const splitted = file.split('.');
   return splitted[splitted.length - 1];
 };
 
 try {
   walkSync(process.argv[2]);
   console.log(ANSI_GREEN, 'finished renaming js files to ts', ANSI_DEFAULT);
 } catch (err) {
   console.log(ANSI_RED, 'something went wrong while renaming js files', ANSI_DEFAULT);
 }
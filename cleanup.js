// cleanup.js
const fs = require('fs');
const path = require('path');

const deleteFiles = (directory, extension) => {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Unable to scan directory: ${err}`);
            return;
        }

        files.forEach((file) => {
            const fullPath = path.join(directory, file);

            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    console.error(`Unable to read file stats: ${err}`);
                    return;
                }

                if (stats.isDirectory()) {
                    deleteFiles(fullPath, extension);
                } else if (file.endsWith(extension)) {
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error(`Unable to delete file: ${err}`);
                        } else {
                            console.log(`Deleted: ${fullPath}`);
                        }
                    });
                }
            });
        });
    });
};

// Delete .js and .js.map files from the src directory
deleteFiles(path.join(__dirname, 'src'), '.js');
deleteFiles(path.join(__dirname, 'src'), '.js.map');
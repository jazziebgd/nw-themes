const fs = require('fs');
const path = require('path');

class Helper {
    getThemes (baseDir){
        let themes = [];
        let directory = path.join(baseDir, 'themes');
        if (fs.existsSync(directory)){
            let stats = fs.statSync(directory);
            if (stats.isDirectory()){
                let files = fs.readdirSync(directory);
                for (let i=0; i<files.length; i++){
                    let dirPath = path.join(directory, files[i]);
                    let dirStats = fs.statSync(dirPath);
                    if (dirStats.isDirectory()){
                        let definitionFile = path.join(dirPath, 'theme.js');
                        if (fs.existsSync(definitionFile)){
                            let fileStats = fs.statSync(definitionFile);
                            if (fileStats.isFile()){
                                try {
                                    let themeDefinition = require(definitionFile);
                                    if (themeDefinition && themeDefinition.theme && themeDefinition.theme.name){
                                        themes.push(themeDefinition);
                                    }
                                } catch (ex) {
                                    console.error(ex);
                                }
                            }
                        }
                    }
                }
            }
        }
        return themes;
    }
}

exports.Helper = Helper;
const mkdirp = require('mkdirp')
const fs = require("fs");
const path = require('path');


/**
 * Quelques méthodes utilitaires courantes sur des fichier
 * Fonctionne uniquement dans node
 */
export default class EE09fileUtilsNode {
    /**
     * Pour connaitre le répertoire d'un fichier
     * @param {string} filePath
     * @return {string}
     */
    getDir(filePath){
        return path.dirname(filePath)
    }

    /**
     * Est-ce que ce répertoire existe est est bien un répertoire?
     * @param {string} dirPath
     * @return {boolean}
     */
    existsDir(dirPath){
        if(fs.existsSync(dirPath)){
            return fs.lstatSync(dirPath).isDirectory()
        }
        return false;
    }
    /**
     * Est-ce que ce fichier existe est est bien un fichier?
     * @param {string} dirPath
     * @return {boolean}
     */
    existsFile(filePath){
        if(fs.existsSync(filePath)){
            return fs.lstatSync(filePath).isFile();
        }
        return false;
    }

    /**
     * Crée récursivement le répertoire d'un fichier donné s'il n'existe pas
     * @param {string} filePath Un fichier qui peut ne pas exister
     */
    mkdirOfFile(filePath){
        let dir=this.getDir(filePath);
        if(!this.existsDir(dir)){
            mkdirp.sync(dir);
        }
    }


}
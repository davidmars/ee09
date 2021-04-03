const sharp = require('sharp');
/**
 * Utilitaires pour travailler sur des images (avec node et sharp)
 *
 */
export default class EE09imageUtilsNode{
    /**
     * Renvoie en callback la largeur et la hauteur
     * @param {string} filePath
     * @param {function} cb
     */
    getSize(filePath,cb){
        sharp(filePath).metadata()
            .then(function(metadata) {
                cb(Number(metadata.width),Number(metadata.height))
            });
    }
}
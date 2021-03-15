const uniqid = require('uniqid');
/**
 * Quelques méthodes utilitaires courantes
 */
export default class EE09string {

    constructor() {
    }

    /**
     * Renvoie un identifiant unique
     * @param {string} prefix
     * @param {string} suffix
     * @return {string}
     */
    uniqId(prefix=null,suffix=null){
            return uniqid(prefix,suffix);
    }
}
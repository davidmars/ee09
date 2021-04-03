/**
 * Classe utilitaire qui permet de tester le type d'un objet
 */
export default class EE09is{

    /**
     * Teste si la valeur est une string
     * @param {*} value
     * @return {boolean}
     */
    aString(value){
        return typeof value==="string";
    }
    /**
     * Teste si la valeur est un Number
     * @param {*} value
     * @return {boolean}
     */
    aNumber(value){
        return typeof value==="number";
    }
    /**
     * Teste si la valeur est un Booleen
     * @param {*} value
     * @return {boolean}
     */
    aBool(value){
        return typeof value==="boolean";
    }
    /**
     * Teste si la valeur est définie
     * @param {*} value
     * @return {boolean}
     */
    aUndefined(value){
        return typeof value==="undefined";
    }
    /**
     * Teste si la valeur est un objet
     * @param {*} value
     * @return {boolean}
     */
    aObject(value){
        return typeof value==="object";
    }
}
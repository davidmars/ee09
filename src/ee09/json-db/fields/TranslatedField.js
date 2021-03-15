/**
 * Un objet qui contient une valeur par langue configurée dans $db
 */
export default class TranslatedField{
    constructor() {
        for(let lang of window.$db.settings.languages){
            this[lang.code]="";
        }
    }

    /**
     * Renvoie la valeur pour une langue donnée
     * @param {String} langCode
     * @return {String}
     */
    getValue(langCode){
        return this[langCode];
    }
}
/**
 * Un objet qui contient une référence de fichier par langue configurée dans $db
 */
import TranslatedField from "./TranslatedField";
import FileField from "./FileField";

export default class TranslatedFilesField extends TranslatedField{
    constructor() {
        super();
        for(let lang of window.$db.settings.languages){
            this[lang.code]=new FileField();
        }
    }

    /**
     * Renvoie le fichier pour une langue donnée
     * @param {String|DbLanguage} language
     * @return {DbRecordFile|null}
     */
    getValue(language){
        /**
         *
         * @type {FileField|null}
         */
        let val = super.getValue(language);
        if(val && val.record){
            return val.record;
        }
        return null;
    }

    /**
     * Renvoie le href du fichier dans la langue courante
     * @return {String}
     */
    toString() {
        /**
         *
         * @type {DbRecordFile|null}
         */
        let file=this.getValue(window.$db.settings.currentLanguage.code);
        if(file){
            return file.href;
        }
        return ";"
    }
}
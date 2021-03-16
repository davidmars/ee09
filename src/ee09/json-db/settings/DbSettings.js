import DbLanguage from "./DbLanguage";
import DbModelType from "./DbModelType";

export default class DbSettings{
    /**
     *
     * @param {JsonDb} db
     */
    constructor(db) {
        this.db=db;
        /**
         * Les langues prises en charge
         * @type {DbLanguage[]}
         */
        this.languages=[];
        /**
         * Les types de record pris en charge
         * @type {DbModelType[]}
         */
        this.modelsTypes=[];
    }

    /**
     * Ajoute une langue à la BDD
     * @param {string} code
     * @param {string} label
     * @param {string} flagImg
     */
    addLanguage(code,label,flagImg){
        let existing=this.getLanguage(code);
        if(!existing){
            this.languages.push(
                new DbLanguage(code,label,flagImg)
            );
        }else{
            console.warn("addLanguage existe déjà !",existing)
        }

    }
    /**
     * Ajoute un type de record à la BDD
     * @param {string} type
     * @param {string} label
     * @param {string} icon
     * @param {Function} create
     * @return {DbModelType}
     */
    addModelType(type,label,icon,create){
        let existing=this.getModelType(type);
        if(!existing){
            existing=new DbModelType(type,label,icon,create);
            this.modelsTypes.push(existing);
        }else{
            console.warn("addModelType existe déjà !",existing)
        }
        return existing;
    }

    /**
     * Renvoie un DbModelType à partir de son type
     * @param {string} type
     * @return {DbModelType}
     */
    getModelType(type){
        return this.modelsTypes.find(item=>item.type===type);
    }
    /**
     * Renvoie un DbLanguage à partir de son code langue
     * @param {string} type
     * @return {DbLanguage}
     */
    getLanguage(langCode){
        return this.languages.find(item=>item.code===langCode);
    }
}
/**
 * Désigne un type de record
 */
import DbRecord from "@/ee09/json-db/records/DbRecord";

export default class DbModelType{
    /**
     *
     * @param {String} type
     * @param {String} label
     * @param {String} icon
     * @param {Function} create
     */
    constructor(type,label,icon,create) {
        /**
         * Le type de record tel qu'enregistré dans la bases de données
         * @type {String}
         */
        this.type=type;
        /**
         * icone de représentation
         * @type {String}
         */
        this.icon=icon;
        /**
         * nom de représentation
         * @type {String}
         */
        this.label=label;
        /**
         * nom de la représentation au pluriel
         * @type {string}
         */
        this.labelPlural=this.label+"s";
        /**
         * Méthode permettant de créer un nouvel objet de ce type
         * Il FAUT écraser cette méthode pour chaque type afin qu'elle renvoie une instance appropriée
         * @return {DbRecord}
         */
        this.create=function(){
            return new DbRecord();
        }
        if(create){
            this.create=create;
        }
        /**
         * Le nom du composant pour éditer ce type de record ce composant doit se nommer "type-edit"
         * @type {string}
         */
        this.editComponent=this.type+"-edit";

        /**
         * Orde d'apparition dans la liste de type de modèles
         * @type {number}
         */
        this.order=10;
    }

    /**
     * Is it a file or not?
     * @return {boolean}
     */
    get isFile(){
        return this.type==="file";
    }

    /**
     *
     * @return {DbRecord}
     */
    getInstance(jsonData){
        let r= this.create();
        if(jsonData){
            r.mount(jsonData);
        }
        return r;
    }
}
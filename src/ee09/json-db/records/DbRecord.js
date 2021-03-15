const merge=require('lodash/merge');
export default class DbRecord{
    constructor() {
        this.type="dbRecord";
        this.uid=null;
        this.name="";
        this.dateCreated=new Date().toISOString();
        this.dateModified=new Date().toISOString();



    }



    /**
     * Visible que dans l'admin (sous name)
     * @return {null|string}
     */
    get adminSubtitle(){
        return this.uid;
    }
    /**
     * Une icone visible que dans l'admin (sous name)
     * @return {null|string}
     */
    get adminSubtitleIcon(){
        return null;
    }

    /**
     * Une thumbnail visible uniquement dans l'admin
     * @return {null|string}
     */
    get adminThumb(){
        return null;
    }

    /**
     * Charge les données dans l'objet
     * @param {*} data Les donnée issues du json
     */
    mount(data){
        if(data){
            merge(this,data);
            //Object.assign(this, data);
            //this._setUid();
        }
    }

    /**
     * Appelé quand on fait un store
     */
    update(){
        this._setUid();
        this.dateModified=new Date().toISOString();
    }

    /**
     * Définit un uid au record si il n'en a pas encore
     * @private
     */
    _setUid(){
        if(!this.uid) {
            this.uid=window.$db.utils.string.uniqId(this.type+"-");
        }
    }

    /**
     * Renvoie la dbUidString de ce record (si il est enregistré)
     * @return {string|null}
     */
    get dbUidString(){
        if(this.uid){
            return "db:"+this.uid;
        }
        return null;
    }

    /**
     * Renvoie les propriétés du modèle
     * @return {DbModelType}
     */
    get modelType(){
        return window.$db.settings.getModelType(this.type);
    }
}
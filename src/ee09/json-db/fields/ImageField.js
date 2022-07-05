import RecordField from "./RecordField";
import TranslatedField from "./TranslatedField";
//import ImageFactoryUrl from "../images/ImageFactoryUrl";
import ImageFactoryUrlNode from "../images/ImageFactoryUrlNode";

export default class ImageField extends RecordField{
    /**
     *
     * @param {{}<ImageFactoryUrlNode>} resizes Permet de générer les miniatures aux formats fournis quand le champ est défini
     */
    constructor(resizes={}) {
        super();
        /**
         * Description de l'image en plusieurs langues
         * @type {TranslatedField}
         */
        this.alt=new TranslatedField();

        let me=this;



        //note: ces méthodes sont définies ici afin de ne pas enregistrer les presets de resize dans le json de la BDD

        /**
         * Renvoie l'url d'une image resize à partir de la clé définie dans le constructeur
         * @param {string} resizePresetName
         * @return {String}
         * @private
         */
        this._resizeByPreset=function(resizePresetName){
            let im=resizes[resizePresetName];
            im.source=me.record.href;
            return im.href();
        }
        /**
         * Met en cache les presets resize définis dans le constructeur
         * @private
         */
        this._resizePreCaches=function(){
            if(this.record && this.record.isImage){
                //console.log("loop _resizePreCaches")
                Object.entries(resizes).forEach(([resizePresetName,value])=>{
                    //console.log("_resizePreCaches",resizePresetName,value)
                    me._resizeByPreset(resizePresetName);
                })
            }
        }

    }

    /**
     * Méthode appelée une fois que le champ est monté ou modifié
     * @private
     */
    _processData(){
        this._resizePreCaches();
    }


    /**
     * Renvoie le record file relatif
     * @return {DbRecordFile|null}
     */
    get record(){
        return super.record;
    }
    set record(record){
        if(record && record.isImage){
            this.uid=record.uid;
            this._processData();
        }else{
            this.uid="";
        }

    }

    /**
     * Renvoie le chemin permettant de charger l'image
     * @return {string}
     */
    get href(){
        let r=this.record;
        if(r){
            return r.href;
        }
        return "";
    }

    /**
     * Permet d'obtenir une image recadrée
     * @return {ImageFactoryUrlNode}
     */
    resize(presetName=null){
        if(presetName){
            return this._resizeByPreset(presetName);
        }else{
            //TODO web ici il faudra probablement insérer un appel à ImageFactory normal
            return new ImageFactoryUrlNode(this.record.hrefLocal);
        }
    }




}
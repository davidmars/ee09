import RecordField from "./RecordField";
import TranslatedField from "./TranslatedField";
//import ImageFactoryUrl from "../images/ImageFactoryUrl";
import ImageFactoryUrlNode from "../images/ImageFactoryUrlNode";

export default class ImageField extends RecordField{
    /**
     *
     * @param {ImageFactoryUrl[]} resizes Permet de générer les miniatures aux formats fournis quand le champ est défini
     */
    constructor(resizes=[]) {
        super();
        /**
         * Description de l'image en plusieurs langues
         * @type {TranslatedField}
         */
        this.alt=new TranslatedField();

        let me=this;
        this._resizePreCaches=function(){
            console.log("_resizePreCaches")
            if(this.record.isImage){
                for(let conf of resizes){
                    conf.source=me.record.hrefLocal;
                    conf.toString();
                }
            }
        }
    }

    /**
     * Renvoie le record file relatif
     * @return {DbRecordFile|null}
     */
    get record(){
        return super.record;
    }
    set record(record){
        if(this.record && this.record.isImage){
            this.uid=record.uid;
            this._resizePreCaches();
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
    resize(){
        //TODO web ici il faudra probablement insérer un appel à ImageFactory normal
        return new ImageFactoryUrlNode(this.record.hrefLocal);
    }



}
import RecordField from "./RecordField";
import TranslatedField from "./TranslatedField";

export default class ImageField extends RecordField{
    constructor() {
        super();
        /**
         * Description de l'image en plusieurs langues
         * @type {TranslatedField}
         */
        this.alt=new TranslatedField();
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

}
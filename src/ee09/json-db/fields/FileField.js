import RecordField from "./RecordField";

/**
 * Une référence à un fichier dans la base de données
 */
export default class FileField extends RecordField{
    constructor() {
        super();
    }
    /**
     * Renvoie le record file relatif
     * @return {DbRecordFile|null}
     */
    get record(){
        return window.$db.getByUid(this.uid,"file");
    }

    /**
     * Définit le record file associé
     * @param {DbRecordFile|null} record
     */
    set record(record){
        if(record && record.type==="file"){
            this.uid=record.uid;
        }else{
            this.uid="";
        }
    }

    /**
     * Renvoie le chemin permettant de charger le fichier depuis le client
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
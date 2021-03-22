export default class RecordField{
    constructor() {
        /**
         * Identifiant unique du DbRecord
         * @type {string}
         */
        this.uid="";
    }

    /**
     * Renvoie le record relatif
     * @return {DbRecordFile|null}
     */
    get record(){
        return window.$db.getByUid(this.uid,"file");
    }

    set record(record){
        if(this.record){
            this.uid=record.uid;
        }else{
            this.uid="";
        }
    }
}
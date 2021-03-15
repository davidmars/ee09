const EventEmitter = require('event-emitter-es6');

export default class EE09task extends EventEmitter{



    constructor() {
        super();
        this._uid=Math.random();
        this._status="";
        this._percent=0;
        this.errors=[];
        /**
         * L'objet résultant de l'opération
         * @type {*}
         */
        this._result=null;
    }
    /**
     * @param {"RESULT"|"ERROR"|"STATUS_CHANGE"|"PROGRESS"} type
     * @param {Function} listener
     */
    on(type, listener){
        super.on(type, listener);
    }
    addError(err){
        this.errors.push(err);
        this.emit("ERROR",err);
    }
    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
        this.emit("RESULT",this._result);
    }
    get status() {
        return this._status;
    }
    set status(value) {
        console.log("s",value,this._status,this._uid)
        if(value !==this._status){
            this._status = value;
            this.emit("STATUS_CHANGE",this._status);
        }
    }
    get percent() {
        return this._percent;
    }

    set percent(value) {
        if(value !==this._percent){
            this._percent = value;
            this.emit("PROGRESS",this._percent);
        }
    }
}


export default class DateField{

    constructor() {
        /**
         * Le temps au format iso
         * @type {string}
         * @example 2013-10-24T20:36:30
         */
        this.isoString=this._cleanIso(new Date());

    }



    /**
     * Permet de formater la date
     * @param {'yyyy/MM/dd'|'yyyy-MM-dd'|'HH:mm:ss'|String} fmt
     * @see https://date-fns.org/v2.17.0/docs/format
     * @return {string}
     */
    format(fmt){
        return window.$db.utils.date.format(this.date,fmt)
    }

    /**
     * Renvoie l'objet date javascript correspondant
     * @return {Date}
     */
    get date(){
        return new Date(this.isoString);
    }

    /**
     * Permet de définir la valeur à partir d'une date javascript
     * @param {Date} value
     */
    set date(value){
        this.isoString=this._cleanIso(value);
    }

    _cleanIso(date){
        return window.$db.utils.date.format(date,"yyyy-MM-dd'T'HH:mm:ss")
    }

}
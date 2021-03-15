import format from 'date-fns/format';

export default class EE09dateUtils{
    /**
     * Renvoie la date actuelle formatée
     * @param {'yyyy/MM/dd'|'yyyy-MM-dd'|'HH:mm:ss'|String} fmt
     * @see https://date-fns.org/v2.17.0/docs/format
     */
    now(fmt){
        return format(new Date(), fmt)
    }
}
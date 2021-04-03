export default class DbLanguage{
    constructor(code,label,flagImg) {
        /**
         * Code iso de la langue
         * @type {String}
         * @example fr, en, it, es etc...
         */
        this.code=code;
        /**
         * Nom de la langue
         * @type {String}
         * @example Français
         */
        this.label=label;
        /**
         * Url de l'image du drapeau
         * @type {String}
         * @example require("svg-country-flags/svg/fr.svg"))
         */
        this.flagImg=flagImg;
    }

    /**
     * Renvoie true si la langue est la langue courrante
     * La variable current est définie dans $db.settings.currentLanguage
     * @return {boolean}
     */
    get isCurrent(){
        if(!window.$db.settings.currentLanguage){
            return false;
        }
        return window.$db.settings.currentLanguage.code === this.code;
    }

}
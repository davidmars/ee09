import getVideoId from 'get-video-id';
const validUrl = require('valid-url');
/**
 * Permet d'analyser des urls
 */
export default class EE09urlAnalyzer{
    constructor() {

    }
    /**
     * Est-ce une url vimeo?
     * @param {String} url
     * @return {boolean}
     */
    isVimeo(url){
        return this.getVideoServiceAndId(url).service==="vimeo"
    }

    /**
     * Est-ce une url youtube?
     * @param {String} url
     * @return {boolean}
     */
    isYoutube(url){
        return this.getVideoServiceAndId(url).service==="youtube"
    }

    /**
     * Renvoie le service et l'id correspondant à la vidéo de cette url
     * @param {String} url
     * @return {{id: string | null, service: "youtube" | "vimeo" | "vine" | "videopress" | null}}
     */
    getVideoServiceAndId(url){
        return getVideoId(url);
    }

    /**
     * Est-ce que l'url est valide?
     * @param {String} url
     * @return {boolean}
     */
    isValid(url){
        return validUrl.isWebUri(url);
    }
}
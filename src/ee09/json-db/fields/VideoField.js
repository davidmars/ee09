

export default class VideoField{

    constructor() {
        /**
         * Ce que l'utilisateur a saisi
         * @type {string}
         * @private
         */
        this._userInput="";
        /**
         * type de données youtube, vimeo, http ou file
         * @type {string}
         */
        this.provider="";
        /**
         * Identifiant de la vidéo qui va de pair avec privider
         * @type {string}
         */
        this.videoId="";
    }

    /**
     * Renvoie une icone mdi en fonction du provider
     * @return {string}
     */
    get providerMdiIcon(){
        switch (this.provider){
            case "vimeo":
                return "mdi-vimeo";
            case "youtube":
                return "mdi-youtube";
            case "http":
                return "mdi-play-network";
            case "file":
                return "mdi-file-video";
            default:
                return "mdi-alert"
        }
    }

    /**
     * Renvoie les potentielles erreurs
     * @return {String[]}
     */
    getErrors(){
        let r=[];
        if(!this.userInput){
            r.push("Veuillez saisir une adresse Youtube, Viméo ou choisir un fichier vidéo");
        }else{
            if(!this.videoId || !this.provider){
                r.push("Impossible de déterminer l'origine de la vidéo")
            }
        }
        return r;
    }
    /**
     * Pour obtenir un objet source compatible avec Plyr
     * @return {{sources: [{src: string}], type: string}}
     */
    getPlyrSource(){
        let r={
            type:"video",
            sources:[
                {
                    src:""
                }
            ]
        }
        /**
         *
         * @type {null|DbRecordFile}
         */
        let record=null;
        switch (this.provider){
            case "youtube":
            case "vimeo":
                r.sources[0].src=this.videoId;
                r.sources[0].provider=this.provider;
                break;
            case "file":
                record=window.$db.getByUid(this.videoId,"file");
                if(record){
                    r.sources[0].src=record.href;
                }
                break;
            default:
                r.sources[0].src=this.videoId;
            //r.sources[0].type="video/webm";

        }
        return r;
    }
    get userInput() {
        return this._userInput;
    }
    set userInput(value) {
        let input=value;
        this._userInput = value;
        this.provider=null;
        this.videoId=null;
        /**
         *
         * @type {DbRecordFile|null}
         */
        let record=window.$db.findOneByDbString(value,"file");
        if(record){
            this.provider="file";
            this.videoId=record.uid;
            return;
        }
        let extract=window.$db.utils.url.getVideoServiceAndId(input);
        if(extract.service && extract.id){
            if(extract.service==="youtube" || extract.service==="vimeo"){
                this.provider=extract.service;
                this.videoId=extract.id;
            }
        }else{
            if(window.$db.utils.url.isValid(input)){
                this.provider="http";
                this.videoId=input;
            }
        }
    }
}
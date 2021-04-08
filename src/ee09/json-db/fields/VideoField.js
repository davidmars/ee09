import TranslatedFilesField from "./TranslatedFilesField";

/**
 * Le vidéo field est un objet haut niveau permettant de gérer un média vidéo et ses différents aspects.
 * Le champ vidéo peut supporter des vidéos locale, des vidéos youtube, vimeo et des flux http
 * D'autre part le champ vidéo dispose de la possibilité d'ajouter des sous titres pour chaque langue.
 */
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
         * Identifiant de la vidéo qui va de pair avec provider
         * @type {string}
         */
        this.videoId="";
        /**
         * Un jeu de fichier par langues
         * @type {TranslatedFilesField}
         */
        this.subtitles=new TranslatedFilesField();

    }

    /**
     * Renvoie une icône mdi en fonction du provider
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
            case "iframe":
                return "mdi-iframe";
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
            ],
            tracks:[]
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

        for(let lang of window.$db.settings.languages){
            let file=this.subtitles.getValue(lang);
            if(file && file.byteSize>0){
                r.tracks.push({
                    kind:'captions',
                    label:lang.label,
                    srclang:lang.code,
                    //src:"https://cdn.plyr.io/static/demo/thumbs/100p.vtt",
                    src:file.href,
                    default:lang.isCurrent
                })
            }
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
            switch (true){
                case window.$db.utils.url.isValid(input):
                    this.provider="http";
                    this.videoId=input;
                    break;
                case String(input).indexOf('<iframe') > -1:
                    this.provider="iframe";
                    this.videoId=input;
                    break;

            }
        }
    }
}
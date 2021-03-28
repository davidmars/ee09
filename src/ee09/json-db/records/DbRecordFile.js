import DbRecord from "./DbRecord";
export default class DbRecordFile extends DbRecord{
    constructor() {
        super();
        this.type="file";
        this.md5="";
        this.path="";
        this.mime=""
        this.byteSize=0;
    }

    /**
     * Renvoie le chemin permettant de charger le fichier (ou une chaine vide)
     * @return {string}
     */
    get href(){
        let p="";
        if(this.path){
            p=window.$db.rootPath+"/fs/"+this.path;
        }
        return p;
    }
    /**
     * Renvoie le chemin permettant de charger le fichier en local
     * @return {string}
     */
    get hrefLocal(){
        //TODO web ici il faudra probablement insérer une routine différente
       return this.href;
    }

    /**
     * Renvoie true si le fichier est une image
     * @return {RegExpMatchArray}
     */
    get isImage(){
        return this.mime.match(/image/);
    }

    /**
     * Renvoie true si le fichier est une vidéo
     * @return {RegExpMatchArray}
     */
    get isVideo(){
        return this.mime.match(/video/);
    }

    /**
     * Poids et mime du fichier
     * @return {string}
     */
    get adminSubtitle(){
        return window.$db.utils.file.humanSize(this.byteSize)+" "+this.mime;
    }

    /**
     * Icone qui correspond au type de fichier
     * @return {string}
     */
    get adminSubtitleIcon(){
        return window.$db.utils.file.mdiIcon(this.path,this.mime);
    }

    /**
     * Une thumbnail visible uniquement dans l'admin
     * @return {null|string}
     */
    get adminThumb(){
        if(this.isImage){
            return this.href;
        }
        return null;
    }

}
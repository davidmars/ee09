import DbRecord from "./DbRecord";
import ImageFactoryUrlNode from "../images/ImageFactoryUrlNode";
export default class DbRecordFile extends DbRecord{
    constructor() {
        super();
        this.type="file";
        /**
         * Clé de hashage
         * @type {string}
         */
        this.md5="";
        /**
         * Chemin du fichier
         * @type {string}
         */
        this.path="";
        /**
         * Mime type du fichier
         * @type {string}
         */
        this.mime=""
        /**
         * Poids du fichiers en bytes
         * @type {number}
         */
        this.byteSize=0;
        /**
         * Largeur si il s'agit d'une image
         * @readonly
         * @type {number}
         */
        this.width=0;
        /**
         * Hauteur si il s'agit d'une image
         * @readonly
         * @type {number}
         */
        this.height=0;



    }

    /**
     * Renvoie l'extension (sans point)
     * @return {string}
     */
    get extension(){
        return window.$db.utils.file.ext(this.path);
    }

    /**
     * Calcule les dimensions de l'image (si s'en est une)
     * @private
     */
    _processData(){
        super._processData();
        let me=this;
        if(this.isImage && window.$db.utils.image){
            if(this.width===0){
                window.$db.utils.image.getSize(this.hrefLocal,
                    function(w,h){
                        me.width=w;
                        me.height=h;
                    }
                );
            }
        }
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
        let r= window.$db.utils.file.humanSize(this.byteSize)+" "+this.mime;
        if(this.isImage){
            r+=` ${this.width}x${this.height}px`
        }
        return r;
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
            //TODO WEB gérer version alternative
            return new ImageFactoryUrlNode(this.hrefLocal)
                .inside(200,200)
                .jpg()
                .toString();
        }
        return null;
    }

}
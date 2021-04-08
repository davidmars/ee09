import ImageFactoryUrl from "./ImageFactoryUrl";
const sharp = require('sharp');
/**
 * Permet de générer des miniatures qui sont mises en cache
 * Ce module ne fonctionne qu'avec node
 */
export default class ImageFactoryUrlNode extends ImageFactoryUrl{
    constructor(source) {
        super(source);
    }

    /**
     * Renvoie l'url pour charger l'image dans le navigateur.
     * Génèrera l'image si ce n'est pas déjà fait
     * @return {string}
     */
    href(){
        if(this.testExists()){
            this.ready=true;
        }else{
            this._generateImage(this._localPath());
        }
        return super.href();
    }
    /**
     * Renvoie true si le fichier final existe
     * Met en cache les positifs pour un process plus rapide
     * @return {boolean}
     */
    testExists(useCache=true){
        let path=this._localPath();
        if(useCache && ImageFactoryUrlNode._cache.fileExists[path]){
            return true;
        }
        let exist= window.$db.utils.fileNode.existsFile(path);
        if(exist){
            ImageFactoryUrlNode._cache.fileExists[path]=true;
        }
        return exist;
    }

    /**
     * Génère réellement l'image, crée les répertoires etc...
     * @param destImagePath
     * @private
     */
    _generateImage(destImagePath){
        /**
         *
         * @type {ImageFactoryUrlNode}
         */
        let me=this;
        let utils=window.$db.utils.fileNode;
        //crée le répertoire
        utils.mkdirOfFile(destImagePath);
        //crée l'image
        if(utils.existsFile(this.source)){
            let s=sharp(this.source);
            let resizeOptions={}
            if(this._fit!=="auto"){
                resizeOptions["fit"]=this._fit;
                resizeOptions["background"]=this._background.replace("0x","#");
            }
            if(this._width!==0){
                resizeOptions["width"]=this._width;
            }
            if(this._height!==0){
                resizeOptions["height"]=this._height;
            }
            s.resize(resizeOptions);
            switch (this._format){
                case "jpg":
                    s.jpeg({quality:this._quality});
                    break;
                case "webp":
                    s.webp({quality:this._quality});
                    break;
            }

            s.toFile(destImagePath, (
                    err
                    //, info
                    ) => {
                if(err){
                    console.error("ImageFactoryUrlNode error",err);
                }else{
                    setTimeout(function(){
                        ImageFactoryUrlNode._cache.fileExists[destImagePath]=true;
                        me.ready=true;
                    },100)


                }
            });
        }
    }


}

ImageFactoryUrlNode._cache={
    fileExists:{}
}
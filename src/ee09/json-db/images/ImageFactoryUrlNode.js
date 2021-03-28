import ImageFactoryUrl from "./ImageFactoryUrl";
import sharp from "sharp";

/**
 * Permet de générer des miniatures qui sont mises en cache
 * Ce module ne fonctionne qu'avec node
 */
export default class ImageFactoryUrlNode extends ImageFactoryUrl{
    constructor(source) {
        super(source);
        this.ready=false;
    }
    toString() {
        let url = super.toString();
        let utils=window.$db.utils.fileNode;
        //si le fichier n'existe pas déjà
        if(!utils.existsFile(url)){
            this._generateImage(url);
        }else{
            this.ready=true;
        }
        return url;
    }

    _generateImage(destImagePath){
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

            s.toFile(destImagePath, (err, info) => {
                if(err){
                    console.error("ImageFactoryUrlNode error",err);
                }else{
                    me.ready=true;
                    console.log("ImageFactoryUrlNode success",info);
                }
            });
        }
    }


}
export default class ImageFactoryUrl {
    constructor(source) {
        this.source=source;
        this._fit="auto";
        this._width=0;
        this._height=0;
        this._background= "0x000000";
        /**
         * Qualité de compression de l'image
         * @type {number}
         */
        this._quality= 80;
        this._format= "jpg";
    }
    /**
     * Renvoie l'url permettant de charger l'image modifiée
     * @return {string}
     */
    href(){
        return this.toString();
    }

    bg(hexColor="FF0000"){
        hexColor=hexColor.replace("#",'');
        this._background="0x"+hexColor;
        return this;
    }
    /**
     * Définit la largeur
     * @param value
     * @return {ImageFactoryUrl}
     */
    w(value){
        this._width=value;
        return this;
    }
    /**
     * Définit la hauteur
     * @param value
     * @return {ImageFactoryUrl}
     */
    h(value){
        this._height=value;
        return this;
    }

    /**
     * Redimensionne l'imge de manière à ce qu'elle ne mesure pas plus que les dimensions fournies
     * @param {Number} w
     * @param {Number} h
     * @return {ImageFactoryUrl}
     */
    inside(w=100,h=100){
        this._fit="inside";
        this._width=w;
        this._height=h;
        return this;
    }
    cover(w,h){
        this._fit="cover";
        this._width=w;
        this._height=h;
        return this;
    }
    contain(w,h){
        this._fit="contain";
        this._width=w;
        this._height=h;
        return this;
    }

    /**
     * Le fichier de sortie sera un jpeg
     * @param {Number} quality 0 - 100
     * @return {ImageFactoryUrl}
     */
    jpg(quality=80){
        this._quality=quality;
        this._format="jpg";
        return this;
    }
    /**
     * Le fichier de sortie sera un webp
     * @param {Number} quality 0 - 100
     * @return {ImageFactoryUrl}
     */
    webp(quality=80){
        this._quality=quality;
        this._format="webp";
        return this;
    }
    png(){
        this._format="png";
        return this;
    }
    toString(){
        let base=this.source;
        base=window.$db.utils.file.regularSlashes(base);
        base=base.replace("/fs/","/fs-cache/im/");
        let info=`${this._fit}-${this._width}x${this._height}-${this._background}`;
        let extension=``;
        switch (this._format){
            case "jpg":
            case "webp":
                extension=`${this._quality}.${this._format}`;
                break;
            default:
                extension=`${this._format}`;
        }
        return `${base}/${info}.${extension}`;
    }


}
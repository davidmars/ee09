import BMF from 'browser-md5-file';
import EE09task from "../EE09task";

const kebabCase=require('lodash/kebabCase');
const filesize=require('filesize');
const slugify = require('slugify')
/**
 * Quelques méthodes utilitaires courantes sur des fichier
 * Fonctionne dans un navigateur (pas nécessairement dans node)
 */
export default class EE09fileUtilsBrowser {

    constructor() {
        this._md5_busy=0;
    }

    /**
     * Fait le md5 sum et le renvoie dans task result
     * @param {File} file le fichier qu'il faut analyser
     * @return {EE09task}
     */
    md5(file){
        let task=new EE09task();
        if(file.md5){
            task.result=file.md5;
        }else{
            this._md5Perform(file,task);
        }
        return task;
    }

    /**
     * Fonction récursive qui teste si il est possible d'effectuer le md5
     * @param {File} file le fichier qu'il faut analyser
     * @param {EE09task} task
     * @private
     */
    _md5Perform(file,task){
        let me=this;
        console.log("_md5Perform","busy",me._md5_busy)
        //TODO il peut y avoir une erreur sile byte array est null (fichier google drive par exemple)
        if(me._md5_busy<5){ //5 md5 en simultané possibles
            me._md5_busy++;
            let encoder=new BMF();
            encoder.md5(
                file,
                (err, md5) => {
                    if(md5){
                        me._md5_busy--;
                        file.md5=md5;
                        task.result=md5;
                    }else if(err){
                        console.log("md5 error",err)
                        me._md5_busy--;
                        task.addError(err);
                    }
                },
                progress => {
                    task.percent=progress*100;
                },
            );
        }else{
            setTimeout(function(){
                me._md5Perform(file,task);
            },100)
        }

    }

    /**
     * Renvoie l'extension
     * @param {String|File} file Un objet file ou un nom de fichier ou une url de fichier
     * @param {boolean} dot si true renvoie l'extension avec un point devant
     * @return {String}
     */
    ext(file,dot=false){
        if(!file){
            return "";
        }
        let fileName=file;
        if(file && file instanceof File){
            fileName=file.name;
        }
        let ext=fileName.split('.').pop().toLowerCase();
        if(dot){
            return "."+ext;
        }
        return ext;
    }

    /**
     * A partir d'un mime type, tente de renvoyer une icone mdi appropriée
     * @return {string}
     * @param {File|String} fileOrFileName
     * @param {string} mime
     */
    mdiIcon(fileOrFileName,mime){
        let extension=this.ext(fileOrFileName);
        if(fileOrFileName && fileOrFileName instanceof File){
            mime=fileOrFileName.type;
        }
        let mimeIcon="mdiFileDocumentOutline";
        if(!mime && !extension){
            console.warn("appel à mimeToMdiIcon vide !");
            return "mdi-file-question-outline";
        }

        switch (true) {

            case ["js","json","css","php"].indexOf(extension)>-1:
                mimeIcon="mdiCodeBraces";
                break;

            case ["xml","html"].indexOf(extension)>-1:
                mimeIcon="mdiCodeTags";
                break;

            case mime.match(/pdf/)!==null:
            case ["pdf"].indexOf(extension)>-1:
                mimeIcon="mdiFilePdfBox";
                break;

            case mime.match("image")!==null:
                mimeIcon="mdiImage";
                break;

            case mime.match("excel")!==null:
            case mime.match("spreadsheet")!==null:
            case ["csv","xls"].indexOf(extension)>-1:
                mimeIcon="mdiFileExcelOutline";
                break;

            case ["doc","docx","rtf","docx"].indexOf(extension)>-1:
            case mime.match("word")!==null:
            case mime.match("document")!==null:
            case mime.match("rtf")!==null:
                mimeIcon="mdiFileWordOutline";
                break;

            case ["avi","mov","mp4","h264","mkv"].indexOf(extension)>-1:
            case mime.match("video")!==null:
                mimeIcon="mdiMovie";
                break;

            case ["wav","mp3","ogg"].indexOf(extension)>-1:
            case mime.match("audio")!==null:
                mimeIcon="mdiWaveform";
                mimeIcon="mdiMusic";
                break;

            case ["rar","zip","7z","gzip","tar"].indexOf(extension)>-1:
            case mime.match("zip")!==null:
            case mime.match("x-tar")!==null:
                mimeIcon="mdiFolderZipOutline";
                break;

            case ["srt","vtt","sub"].indexOf(extension)>-1:
            case mime.match("text:vtt")!==null:
                mimeIcon="mdiCommentTextOutline";
                break;
        }
        return kebabCase(mimeIcon);
    }

    /**
     * Renvoie la taille du fichier en Kb Mb etc...
     * @param {number|File} bytesOrFile
     * @return {string}
     */
    humanSize(bytesOrFile){
        let bytes=bytesOrFile;
        if(bytesOrFile && bytesOrFile instanceof File){
            bytes=bytesOrFile.size;
        }
        return filesize(bytes,{locale:"fr",round:1});
    }

    /**
     * Renvoie le nom du fichier nettoyé
     * @param {string|File} stringOrFile
     * @return {string}
     */
    slug(stringOrFile){
        let string=stringOrFile;
        if(stringOrFile && stringOrFile instanceof File){
            string=stringOrFile.name;
        }
        return slugify(string);
    }

    /**
     * Renvoie path ou tous les antislashes on été remplacés par des slashes normaux
     * @param {string} path
     * @return {*}
     */
    regularSlashes(path){
        return path.replace(/\\/g, "/");
    }

    /**
     * Teste si le mime type ou l'extension fournies passent le test
     * @param {string} accept une chaine d'acceptation identique à l'attribut input file html
     * @param {string} mime Mime type à tester
     * @param {string} extension Extension à tester (avec ou sans point)
     * @return {boolean}
     */
    validateFileFormat(accept,mime,extension) {
        if(extension){
            extension="."+extension.replace(".","");
        }
        accept=accept.replace(/\s/g, '');
        let acceptArray=accept.split(',');
        let mimeOk=false;
        let extOk=false;

        if(mime){
            mimeOk=acceptArray.filter(acceptable => {
                return new RegExp(acceptable.replace('*', '.*')).test(mime);
            }).length > 0;
        }
        if(extension){
            extOk=acceptArray.filter(acceptable => {
                return new RegExp(acceptable.replace('*', '.*')).test(extension);
            }).length > 0;
        }
        return mimeOk || extOk;
    }



}
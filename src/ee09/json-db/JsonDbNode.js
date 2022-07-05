import JsonDb from "./JsonDb";
import EE09task from "../EE09task";
import EE09fileUtilsNode from "../utils/EE09fileUtilsNode";
import EE09imageUtilsNode from "../utils/EE09imageUtilsNode";
const { JSONStorage } = require('node-localstorage');
const fs = require("fs");
const {dialog} = require('electron').remote;
const {app} = require('electron').remote;


export default class JsonDbNode extends JsonDb{

    constructor(name) {
        super(name);
        this.JSON_FILE_NAME="ee09.records.json"
        let rootPathOk=false;
        if(this.rootPath){
            if (fs.existsSync(this.rootPath)) {
                rootPathOk=true;
            }
        }
        if(!rootPathOk){
            this._createDefaultDb();
        }
        this.utils.fileNode=new EE09fileUtilsNode();
        this.utils.image=new EE09imageUtilsNode();

    }

    start(){
        this._mountJsonStorage();
    }

    /**
     * Si aucune BDD n'a été définie auparavant, en crée une par défaut dans "Mes Documents"
     * @private
     */
    _createDefaultDb(){
        this.rootPath=app.getPath("documents")+"/"+this.name;
        if(!fs.existsSync(this.rootPath)){
            fs.mkdirSync(this.rootPath);
        }
    }

    _mountJsonStorage(){
        this.readOnly=true;
        //reset tout
        this.records=[];
        this._jsonStorage=new JSONStorage(this._rootPath);
        this._jsonRecords=this._jsonStorage.getItem(this.JSON_FILE_NAME);
        if(!this._jsonRecords){
            this.records=[];
            this._jsonRecords=[];
            this.readOnly=false;
            this.push();
        }else{
            this.pull();
            this.readOnly=false;
        }
    }

    /**
     * Enregistre la BDD sur le disque dur
     */
    push(){
        if(this.readOnly){
           console.warn("DB en lecture seule");
           return;
        }
        //enregistre
        this._jsonStorage.setItem(this.JSON_FILE_NAME,this.records);
        //récupère les datas from scratch
        this.pull();
        this.emit("push");
    }
    /**
     * Lit la BDD depuis le disque dur
     */
    pull() {
        this.records=[];
        this._jsonRecords=this._jsonStorage.getItem(this.JSON_FILE_NAME);
        this._mount(this._jsonRecords);
    }

    get rootPath() {
        if(!this._rootPath){
            this._rootPath=localStorage.getItem(`${this.name}-rootPath`);
        }
        return this._rootPath;
    }

    /**
     * Chemin vers le répertoire qui contient la BDD
     * Est enregistré en local storage
     * @param {String} value
     */
    set rootPath(value) {
        this._rootPath=value;
        localStorage.setItem(`${this.name}-rootPath`,value);
    }

    /**
     * Ouvre une fenêtre permettant de sélectionner le dossier de stockage des données
     */
    uiSelectRootPath(){
        let me=this;
        let dialogOptions={
            title:"Où est stockée votre base de données?",
            properties: ['openDirectory']
        };
        if(this.rootPath){
            dialogOptions.defaultPath=this.rootPath;
        }
        dialog.showOpenDialog( dialogOptions)
            .then(result => {
                if(result.filePaths.length){
                me.rootPath=result.filePaths[0];
                me._mountJsonStorage();
                //me.pull();
            }
        }).catch(err => {
            console.error(err)
        })
    }

    /**
     * Copie un fichier physique, le résultat de la tâche est le chemin vers le fichier copié
     * @param {File} file
     * @return {EE09task}
     * @private
     */
    _FScopy(file){
        let me=this;
        let task=new EE09task();
        let md5Task=this.utils.file.md5(file);
        let ext=this.utils.file.ext(file,true);
        md5Task.on("RESULT",function (md5){
            let root=me.rootPath+"/fs/";
            let fileDir=me.utils.date.now("yyyy/MM/dd/");
            let fileName=md5+ext;
            let dest=root+fileDir+fileName;

            if(!fs.existsSync(dest)){
                fs.mkdirSync(root+fileDir,{ recursive: true });
                fs.copyFileSync(file.path,dest);
            }

            task.result=fileDir+fileName;
        })
        return task;
    }
}
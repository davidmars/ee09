import JsonDb from "./JsonDb";
import EE09task from "@/ee09/EE09task";
const { JSONStorage } = require('node-localstorage');
const fs = require("fs"); // Or `import fs from "fs";` with ESM
const {dialog} = require('electron').remote;
const {app} = require('electron').remote;


export default class JsonDbNode extends JsonDb{

    constructor(adapter) {
        super(adapter);
        this._rootPath=localStorage.getItem("rootPath");
        let rootPathOk=false;
        if(this._rootPath){
            if (fs.existsSync(this._rootPath)) {
                rootPathOk=true;
            }
        }
        if(!rootPathOk){
            this._rootPath=app.getPath("documents")+"/jsonDb";
            this.rootPath=this._rootPath;
        }
        if(!fs.existsSync(this.rootPath)){
            fs.mkdirSync(this.rootPath);
        }

        this._jsonStorage=new JSONStorage(this._rootPath);

        this._jsonRecords=this._jsonStorage.getItem("records.json");
        if(!this._jsonRecords){
            this._jsonRecords=[];
            this.push();
        }
    }

    /**
     * Enregistre la BDD sur le disque dur
     */
    push(){
        this._jsonStorage.setItem("records.json",this.records);
        this.pull();
        this.emit("push");
    }
    /**
     * Lit la BDD depuis le disque dur
     */
    pull() {
        this._jsonRecords=this._jsonStorage.getItem("records.json");
        this._mount(this._jsonRecords);
    }

    get rootPath() {
        return this._rootPath;
    }

    set rootPath(value) {
        this._rootPath=value;
        localStorage.setItem("rootPath",value);
    }

    /**
     * Ouvre une fenêtre permettant de sélectionner le dossier de stockage des données
     */
    uiSelectRootPath(){
        let me=this;
        dialog.showOpenDialog( {
            title:"Où est stockée votre base de données?",
            properties: ['openDirectory']
        }).then(result => {
            if(result.filePaths.length){
                me.rootPath=result.filePaths[0]
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

import DbSettings from "./settings/DbSettings";
import DbRecordFile from "./records/DbRecordFile";
import EE09fileUtilsBrowser from "../utils/EE09fileUtilsBrowser";
import EE09task from "../EE09task";
import EE09dateUtils from "../utils/EE09dateUtils";
import EE09urlAnalyzer from "../utils/EE09urlAnalyzer";
import EE09obj from "../utils/EE09obj";
import EE09string from "../utils/EE09string";
const fileUtils=new EE09fileUtilsBrowser();
const EventEmitter = require('event-emitter-es6');

export default class JsonDb extends EventEmitter{

    /**
     *
     * @param {String} name Nom de la base de données
     */
    constructor(name) {
        super();
        /**
         * Nom de la base de données.
         * @type {String}
         */
        this.name=name;
        let me=this;
        /**
         *
         * @type {DbRecord[]}
         */
        this.records=[];
        /**
         * Le paramétrage de la base de données
         * @type {DbSettings}
         */
        this.settings=new DbSettings(this);
        this._settingsBaseRecords();

        /**
         *
         * @type {{date: EE09dateUtils, file: EE09fileUtilsBrowser, url: EE09urlAnalyzer}}
         */
        this.utils={
            file:new EE09fileUtilsBrowser(),
            date:new EE09dateUtils(),
            url:new EE09urlAnalyzer(),
            obj:new EE09obj(),
            string:new EE09string(),
        }
        /**
         * Quand définit sur true les enregistrements en BDD sont impossibles
         * @type {boolean}
         */
        this.readOnly=false;

        setInterval(function(){
            if (me._jsonRecords) {
                if (JSON.stringify(me.records) !== JSON.stringify(me._jsonRecords)) {
                    console.log("db change", typeof me._jsonRecords);
                    me.push();
                }
            }
        },2000);

    }

    /**
     * Configure les records de base
     * @private
     */
    _settingsBaseRecords(){
        this.settings.addModelType('file','Fichier',"mdi-file",function(){
            return new DbRecordFile();
        })
    }

    /**
     * A appeler une fois tous les settings sont ok
     */
    start(){
        this._mount(this._jsonRecords);
    }
    /**
     * Créee ou met à jour un record
     * @param {DbRecord} record
     */
    store(record){
        let existing=this.getByUid(record.uid);
        if(!existing){
            this.records.push(record);
        }
        record.update();
        this.push();
    }
    /**
     * Enregistre la BDD sur le disque dur
     */
    push(){
        alert("push not implemented")
    }

    /**
     * Récupère la BDD depuis de disque dur
     */
    pull(){
        alert("pull not implemented")
    }

    /**
     * Renvoie un file record à partir d'un fichier physique
     * Le systeme se base sur md5file pour déterminer si le fichier existe ou s'il faut le créer
     * @param {File} file
     * @return {EE09task}
     */
    getFileRecord(file){
        let me=this;
        let task=new EE09task();
        task.status="Analyse le fichier";
        let md5Task=fileUtils.md5(file);
        md5Task.once("RESULT", function(md5){
            task.status="Recherche dans la base de données";
            let existing=me.findOne('file','md5',md5);
            if(existing){
                task.result=existing;
            }else{
                let copyTask=me._FScopy(file);
                copyTask.on("PROGRESS",function(percent){
                    task.status="Copie en cours";
                    task.percent=percent;
                })
                copyTask.on("RESULT",function(filePath){
                    let record=new DbRecordFile();
                    record.path=filePath;
                    record.md5=md5;
                    record.byteSize=file.size;
                    record.mime=file.type;
                    record.name=file.name;
                    me.store(record);
                    task.result=record;
                });
            }
        })
        md5Task.on("PROGRESS", function(percent){
            task.status="Analyse";
            task.percent=percent;
        })
        md5Task.on("ERROR", function(err){
            task.addError(err);
        })
        return task;

    }

    /**
     * Copie un fichier physique, le résultat de la tache est le chemin vers le fichier
     * @param {File} file
     * @return {EE09task}
     * @private
     */
    _FScopy(file){
        console.log("file",file);
        return new EE09task();
    }

    /**
     * Efface un record
     * @param {DbRecord} record
     */
    trash(record){
        this.records = this.records.filter(function(value){
            return value.uid !== record.uid;
        });
    }
    /**
     * Transforme les records json en objets
     * @param {*[]} jsonRecords
     * @private
     */
    _mount(jsonRecords){

        for(let record of jsonRecords){
            let uid=record.uid;
            let existing=this.getByUid(uid);
            if(existing){
                //update existing record
                existing.mount(record);
            }else{
                //inject new record
                let mtype=this.settings.getModelType(record.type);
                if(mtype){
                    this.records.push(mtype.getInstance(record));
                }else{
                    console.warn("unknown",record);
                }
            }


        }
    }

    /**
     * Renvoie un seul record où field === value
     * @param {string} type Le type de record
     * @param {string} field Le champ à tester
     * @param {*} value La valeur à trouver
     * @return {DbRecord}
     */
    findOne(type,field,value){
        return this.records.find(item=>item.type===type && item[field]===value);
    }
    /**
     * Permet de trouver un record à partir de son uid
     * @param {string} uid
     * @param {string|null} type permet de ne retourner que le type donné
     * @return {DbRecord|null}
     */
    getByUid(uid,type=null){
        if(!uid){
            return null;
        }
        let rec = this.records.find(item=>item.uid===uid);
        if(rec && type){
            if(rec.type===type){
                return rec;
            }else{
                return null; //le type ne correspond pas
            }
        }
        return rec;
    }

    /**
     * Permet de lister les records d'un même type
     * @param {String} type
     * @return {DbRecord[]}
     */
    getListType(type){
        return this.records.filter(item=>item.type===type);
    }
    /**
     * Cherche un record à partir d'une dbString
     * @param {String} dbUidString Une chaine du type db:type-id
     * @return {DbRecord|null}
     */
    findOneByDbString(dbUidString,type=null){
        const regex = /^db:([a-z]+-[a-zA-Z0-9]+)$/;
        let m=regex.exec(dbUidString);
        if(m){
            let uid=m[1];
            return this.getByUid(uid,type)
        }
        return null;
    }



}
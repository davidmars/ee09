import Vue from "vue";
import FileEdit from "./models/file-edit";

export default class DbUi{
    constructor() {
        this.visible=false;
        this.newRecord=null;
        this.mainAppPackage={
            name:'???',
            version:'???',
        }
        /**
         * Le record affiché en single
         * @type {DbRecord|null}
         */
        this.singleRecord=null;
        this.currentScreen="";
        this.currentRecordsTypes="";

        //composants VUE de base
        Vue.component('file-edit',FileEdit);

        //déclare quelques utilitaires en global

        this.preferences={
            debugMode:false
        }


    }

    /**
     * Affiche la fenêtre de config
     */
    displaySettings(){
        this.visible=true;
        this.currentScreen="settings";
    }

    /**
     * Affiche la liste des records d'un certain type
     * @param {string} type Le type des records à afficher
     */
    displayRecords(type){
        this.visible=true;
        this.currentScreen="records";
        this.currentRecordsTypes=type;
    }
    /**
     * Affiche le formulaire d'édition du record
     * @param {DbRecord} record Le record à afficher
     */
    displayRecord(record){
        this.visible=true;
        this.currentScreen="single-record";
        this.currentRecordsTypes=record.type;
        this.singleRecord=record;
    }
    /**
     * Affiche le formulaire de création d'un nouveau record du type spécifié
     * @param {string} type Le type du record
     */
    displayNewRecord(type){
        this.visible=true;
        this.currentScreen="single-record";
        this.currentRecordsTypes=type;
        this.singleRecord=window.$db.settings.getModelType(type).create();
    }
    /**
     * Affiche une fenêtre de confirmation avant d'effacer réellement un record
     * @param {DbRecord} record Le record à effacer
     */
    trashAskRecord(record){
        if(confirm('Êtes vous certain de vouloir effacer '+ record.name + '?')){
            window.$db.trash(record);
        }
    }
}
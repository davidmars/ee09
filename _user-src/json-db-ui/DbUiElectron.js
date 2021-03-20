import DbUi from "./DbUi";
const currentWindow=require('electron').remote.getCurrentWindow();
export default class DbUiElectron extends DbUi{

    constructor() {
        super();
        let me=this;
        this.isElectron=true;
        this._isDevtoolsOpen=currentWindow.webContents.isDevToolsOpened();
        currentWindow.webContents.on('devtools-opened',function(){
            me._isDevtoolsOpen=true;
        })
        currentWindow.webContents.on('devtools-closed',function(){
            me._isDevtoolsOpen=false;
        })
    }

    get isDevtoolsOpen() {
        return this._isDevtoolsOpen;
    }

    set isDevtoolsOpen(value) {
        this._isDevtoolsOpen = value;
        if(value){
            currentWindow.webContents.openDevTools();
        }else{
            currentWindow.webContents.closeDevTools();
        }

    }


}
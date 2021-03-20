import Vue from "vue";

//Exemple de modèle personnalisé
//import Video from "@/models/Video";
//import VideoEdit from "@/models/video-edit";

import JsonDbNode from "ee09/src/ee09/json-db/JsonDbNode";
import DbUiElectron from "@/ee09/json-db-ui/DbUiElectron";



/**
 *
 * @type {JsonDbNode}
 */
window.$db=new JsonDbNode("my-project-name");

//langues
window.$db.settings.addLanguage("fr","Français",require("svg-country-flags/svg/fr.svg"));
window.$db.settings.addLanguage("en","English",require("svg-country-flags/svg/gb.svg"));
window.$db.settings.addLanguage("es","Español",require("svg-country-flags/svg/es.svg"));

//types de records

//Exemple de modèle personnalisé
/**
let mVideo=window.$db.settings.addModelType(
    "video"
    ,"Vidéo"
    ,"mdi-movie"
    ,function(){
        return new Video();
    }
);
mVideo.order=1;
//composant d'édition
Vue.component('video-edit',VideoEdit);
*/

/**
 * Rend la BDD disponible et réactive dans tous les composants vue
 * @type {JsonDbNode}
 */
Vue.prototype.$db = Vue.observable(window.$db);

/**
 * L'admin
 * @type {DbUiElectron}
 */
window.$dbUi=new DbUiElectron();

//donner à l'ui des infos sur l'app
window.$dbUi.mainAppPackage=require("../../package.json");
/**
 * Rend l'admin disponible et réactif dans tous les composants vue
 * @type {DbUiElectron}
 */
Vue.prototype.$dbUi = Vue.observable(window.$dbUi);

//tout est prêt...
window.$db.start();

# EE09 json-db

Comme son nom l'indique, il s'agit d'une base de données reposant sur json.
Utiliser ce type de base de données pour gérer des millions d'enregistrements ne serait pas une bonne idée.
Cependant si vous souhaitez gérer quelques centaines d'enregistrements json-db fera l'affaire.

Les fichiers json et fichiers physiques sont stockés dans un répertoire, c'est le fichier json qui se charge de référencer les fichiers physiques.


## Configuration

#### Exemple de configuration avec vue

```javascript
import Vue from "vue";
import VideoEdit from "@/models/video-edit";
import JsonDbNode from "@/ee09/json-db/JsonDbNode";
import Video from "@/models/Video";
import DbRecord from "@/ee09/json-db/records/DbRecord";
import DbUi from "@/ee09/json-db-ui/DbUi";

/**
 *
 * @type {JsonDbNode}
 */
window.$db=new JsonDbNode();

//langues
window.$db.settings.addLanguage("fr","Français",require("svg-country-flags/svg/fr.svg"));
window.$db.settings.addLanguage("en","English",require("svg-country-flags/svg/gb.svg"));
window.$db.settings.addLanguage("es","Español",require("svg-country-flags/svg/es.svg"));

//types de records
//vidéo
window.$db.settings.addModelType(
    "video"
    ,"Vidéo"
    ,"mdi-movie"
    ,function(){
        return new Video();
    }
);
//composant d'édition
Vue.component('video-edit',VideoEdit);

window.$db.settings.addModelType(
    "test"
    ,"test"
    ,"mdi-file"
    ,function(){
        return new DbRecord();
    }
);


/**
 *
 * @type {JsonDbNode}
 */
Vue.prototype.$db = Vue.observable(window.$db);

/**
 * L'admin
 * @type {DbUi}
 */
window.$dbUi=new DbUi();
Vue.prototype.$dbUi = Vue.observable(window.$dbUi);

//tout est prêt...
window.$db.start();

```

## JsonDb

### Propriétés

#### records
Il s'agit de la liste des records. Ces records sont des `DbRecords`

#### languages
Liste des langues que gère la base de données


### Méthodes

#### trash
Permet de supprimer un record

#### getByUid
Permet de trouver un record à partir de son uid

#### getListType
Permet de lister les records d'un même type


#### _mount
Transforme les données json en `DbRecords` 
<template>
  <v-list three-line subheader>
    <v-subheader>Configuration</v-subheader>
    <v-list-item>
      <v-text-field
          v-model="$db.rootPath"
          label="Répertoire de stockage des données"
          append-outer-icon="mdi-folder-cog"
          @click="$db.uiSelectRootPath()"
          @click:append-outer="$db.uiSelectRootPath()"
      ></v-text-field>
    </v-list-item>


    <v-subheader>Préférences d'affichage</v-subheader>

    <v-list-item @click="$dbUi.preferences.debugMode=!$dbUi.preferences.debugMode">
      <v-list-item-action>
        <v-checkbox @click.stop="" v-model="$dbUi.preferences.debugMode"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Mode débug</v-list-item-title>
        <v-list-item-subtitle>Affiche des données qui n'intéressent en général que les développeurs.</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-subheader v-if="$dbUi.preferences.debugMode">Développeurs</v-subheader>

    <v-list-item-group v-if="$dbUi.isElectron && $dbUi.preferences.debugMode">

      <!--console-->
      <v-list-item
          @click.stop="$dbUi.isDevtoolsOpen=!$dbUi.isDevtoolsOpen">
        <v-list-item-action>
          <v-checkbox @click.stop="" v-model="$dbUi.isDevtoolsOpen"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Ouvrir la console</v-list-item-title>
          <v-list-item-subtitle>Affiche la console javascript</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>




    </v-list-item-group>


    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          Version du programme
        </v-list-item-title>
        <v-list-item-subtitle>
          {{$dbUi.mainAppPackage.version}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>





  </v-list>
</template>

<script>

export default {
name: "json-db-settings",
  data(){
    return{

    }
  }
}
</script>

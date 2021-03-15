<template>
  <div class="admin-dialog-nav">

    <!--top bar-->
    <div class="top">
      <v-toolbar dark color="gray">
        <v-toolbar-title>Administration</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="align-center">
          <v-btn text @click="$db.push()">
            Enregistrer
          </v-btn>
          <v-btn @click="$dbUi.visible=false">
          <v-icon >mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <!--menu-->
    <div class="left elevation-5">

      <!--liste records-->
      <v-subheader>Bibliothèque</v-subheader>
      <record-model-type-list/>

      <!--paramètres-->
      <div class="bottom">
        <v-divider></v-divider>
        <v-list dense color="transparent" shaped>
          <v-list-item to="settings" @click="$dbUi.displaySettings()" :v-model="true">
            <v-list-item-content>
              <v-list-item-title>
                Paramètres
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </div>

    </div>

  </div>
</template>

<script>
import RecordModelTypeList from "@/ee09/json-db-ui/records/record-type/record-model-type-list";
export default {
name: "admin-dialog-nav",
  components: {RecordModelTypeList}
}
</script>

<style scoped>

</style>
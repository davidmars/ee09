<template>
<div>
  <!-- si le record est nouveau -->
  <v-btn v-if="!record.uid"
         color="success" tile small
         @click="$db.store(record);
                 $dbUi.displayRecords(record.type)">
    Enregistrer
  </v-btn>
  <!-- si le record existe déjà -->
  <v-btn v-else
         color="error" tile small
         @click="$dbUi.trashAskRecord(record)">
    Supprimer
  </v-btn>
</div>
</template>

<script>
export default {
  name: "btns-record-action",
  props:
      {
        /**
         * @type {DbRecord}
         */
        "record":{
          type:Object,
        }
      },
}
</script>

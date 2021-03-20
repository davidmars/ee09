<template>
  <v-list dense  shaped color="transparent" v-model="modelTypes" >
    <record-model-type
        v-for="model of modelTypes"
        :key="model.type"
        :model-type="model"
    ></record-model-type>
  </v-list>
</template>

<script>
import RecordModelType from "./record-model-type";
export default {
  name: "record-model-type-list",
  components: {RecordModelType},
  computed:{
    modelTypes(){
      return this.$db.settings.modelsTypes.concat().sort(function (a,b){
        return a.order > b.order ? 1 : -1;
      })
    }
  }
}
</script>

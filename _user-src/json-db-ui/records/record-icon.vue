<template>
    <v-icon>{{icon}}</v-icon>
</template>

<script>
/**
 * Affiche simplement la bonne icône d'un record en fonction de son type
 */
export default {
    name: "record-icon",
    props:
      {
        /**
         * @type {DbModelType}
         */
        "dbModelType":{
            type:Object,
        },
        /**
         * @type {DbRecord}
         */
        "record":{
            type:Object,
        }
      },
    data(){
      return{}
    },
    computed:{
      icon(){
        /**
         *
         * @type {null|DbModelType}
         */
        let modelType=null;
        if(this.record){
          modelType=this.record.modelType
        }else if(this.dbModelType){
          modelType=this.dbModelType;
        }
        if(modelType){
          if(this.record && this.record.isFile && this.record.mimeType){
              return this.$db.utils.file.mdiIcon(null,this.record.mimeType)
          }
          return modelType.icon;
        }

        return "mdi-question";
      }
    }

}
</script>

<style>

</style>
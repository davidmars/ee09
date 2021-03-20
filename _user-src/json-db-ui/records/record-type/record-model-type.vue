<template>
  <v-list-item :to="m.type" @click="$dbUi.displayRecords(m.type)">
    <v-badge  :content="$db.getListType(m.type).length"
              color="pink accent-4"
              top offset-x="25" offset-y="25"
              :value="$db.getListType(m.type).length>0"
    >
      <v-list-item-avatar color="#EEEEEE" style="margin-left: 0;">
        <v-icon>{{m.icon}}</v-icon>
      </v-list-item-avatar>
    </v-badge>

    <v-list-item-content>
      <v-list-item-title :title="m.labelPlural">
        {{m.labelPlural}}
      </v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <record-create-btn :record-type="m.type"
                         multiple-uploads
                         @add-record="$dbUi.displayNewRecord(m.type)"
                         @add-record-file="addFile($event)"
      />
      <!--
      <v-btn icon small @click.stop="$dbUi.displayNewRecord(m.type)">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
      -->
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import RecordCreateBtn from "../record-create-btn";
export default {
name: "record-model-type",
  components: {RecordCreateBtn},
  props:{
    modelType:{
      type:Object
    }
  },
  computed:{
    /**
     *
     * @return {DbModelType}
     */
    m(){
      return this.modelType
    }
  },
  methods:{
    addFile(e){
      for(let f of e.target.files){
        let task=this.$db.getFileRecord(f);
        task.on("STATUS_CHANGE",function(){
          console.log("STATUS_CHANGE",task.status,task._uid);
        })
        task.on("RESULT", function(result){
          console.log("result",result)
        })
      }
    }
  }
}
</script>

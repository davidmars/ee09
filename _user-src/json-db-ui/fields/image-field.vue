<template>
<div class="image-field mb-6">

  <v-autocomplete
      v-model="f.record"
      :items="$db.recordListImages"
      :filter="customFilter"
      filled
      :label="label"
      item-text="name"
      return-object
      hide-details
  >
    <template v-slot:append>
      <div @mousedown.stop="">
        <record-create-btn
            small
            text="fichier"
            record-type="file"
            file-accept="image/*"
            @add-record-file="addFile($event)"
        />
      </div>

    </template>
    <!-- Liste des images -->
    <template v-slot:item="data">

      <v-list-item-avatar color="grey lighten-3" tile >
        <v-img contain
               :src="data.item.adminThumb"/>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{data.item.name}}</v-list-item-title>
        <v-list-item-action-text>
          <v-icon small v-if="data.item.adminSubtitleIcon">
            {{data.item.adminSubtitleIcon}}
          </v-icon>
          {{data.item.adminSubtitle}}
        </v-list-item-action-text>
      </v-list-item-content>

    </template>
  </v-autocomplete>

  <v-row>
    <v-col v-if="f.href" cols="12">
      <v-sheet color="grey" class="pa-5">
        <v-img max-height="600" contain :src="f.href"></v-img>
      </v-sheet>
    </v-col>
  </v-row>


</div>
</template>

<script>
import RecordCreateBtn from "../records/record-create-btn";
export default {
  name: "image-field",
  components: {
    //RecordListItemInner,
    RecordCreateBtn,
  },
  props:{
    label:{
      type:String
    },
    field:{
      type:Object
    }
  },
  data(){
    return{
    }
  },
  methods:{
    addFile(e){
      let me = this;
      for(let f of e.target.files){
        let task=this.$db.getFileRecord(f);
        task.on("RESULT",
          /**
           *
           * @param {DbRecordFile} result
           */
          function(result){
            console.log("result",result)
            me.field.uid=result.uid;
          }
        );
      }
    },
    customFilter (item, queryText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1;
    }
  },
  computed:{
    /**
     * Le champ image
     * @return {ImageField}
     */
    f(){
      return this.field;
    },
  }
}
</script>

<style lang="less">

</style>
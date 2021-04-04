<template>
<div class="file-field">
  <field-label v-if="label">{{label}}</field-label>
  <v-autocomplete
      v-model="f.record"
      :items="possibleFiles"
      :filter="customFilter"
      filled
      item-text="name"
      return-object
      hide-details
  >
    <template v-slot:prepend-inner>
      <!-- permet par exemple de placer un drapeau ;) -->
      <slot name="prepend"></slot>
    </template>

    <template v-slot:append>
      <slot name="action"></slot>
      <div @mousedown.stop="">
        <record-create-btn
            small
            text="fichier"
            record-type="file"
            :file-accept="fileAccept"
            @set-record-file="setFile"
            :progress="progress"
            :status="status"
        />
      </div>
    </template>

    <!-- le record sélectionné -->
    <template v-slot:selection="data">
      <record-list-item :record="data.item" class="ml-n3"/>
    </template>

    <!-- Liste des fichiers -->
    <template v-slot:item="data">
      <record-list-item-avatar :record="data.item"/>
      <record-list-item-content :record="data.item"/>
      <record-list-item-action :record="data.item"/>
    </template>

  </v-autocomplete>

</div>
</template>

<script>
import RecordCreateBtn from "../records/record-create-btn";
import RecordListItem from "@/ee09/json-db-ui/records/record-list-item";
import FieldLabel from "@/ee09/json-db-ui/fields/field-label";
import RecordListItemAvatar from "@/ee09/json-db-ui/records/list-item/record-list-item-avatar";
import RecordListItemContent from "@/ee09/json-db-ui/records/list-item/record-list-item-content";
import RecordListItemAction from "@/ee09/json-db-ui/records/list-item/record-list-item-action";
export default {
  name: "file-field",
  components: {
    RecordListItemAction,
    RecordListItemContent,
    RecordListItemAvatar,
    FieldLabel,
    RecordListItem,
    RecordCreateBtn,
  },
  props:{
    label:{type:String},
    field:{type:Object},
    fileAccept:{type:String,default: "*"},
  },
  data(){
    return{
      progress:0,
      status:''
    }
  },
  methods:{
    /**
     *
     * @param {event} e
     * @param {DbRecordFile} record
     */
    setFile(e,record){
      console.log("setFile",record)
      let me = this;
      if(record){
        me.field.record=record;
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
     * @return {FileField}
     */
    f(){
      return this.field;
    },
    possibleFiles(){
      return window.$db.recordListFiles.filter( f => this.$db.utils.file.validateFileFormat(this.fileAccept,f.mime,f.extension))
    }
  }
}
</script>

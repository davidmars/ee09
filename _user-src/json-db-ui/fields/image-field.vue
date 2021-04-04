<template>
<div class="image-field">
  <field-label v-if="label">{{label}}</field-label>
  <v-autocomplete
      v-model="f.record"
      :items="$db.recordListImages"
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
            file-accept="image/*"
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

    <!-- Liste des images -->
    <template v-slot:item="data">
      <record-list-item-avatar :record="data.item"/>
      <record-list-item-content :record="data.item"/>
      <record-list-item-action :record="data.item"/>
    </template>

  </v-autocomplete>

  <v-row>
    <v-col v-if="f.href" cols="12">
      <div class="pa-5 ee09-bg-grid-photoshop">
        <v-img max-height="600" contain
               :lazy-src="f.resize().inside(800,800).bg('00ff0088').webp().href()"
               :src="f.resize().inside(800,800).bg('00ff0088').webp().href()"
               >
          <template v-slot:placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
            >
              <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
    </v-col>
  </v-row>


</div>
</template>

<script>
import RecordCreateBtn from "../records/record-create-btn";
import RecordListItem from "@/ee09/json-db-ui/records/record-list-item";
import FieldLabel from "@/ee09/json-db-ui/fields/field-label";
import RecordListItemAction from "@/ee09/json-db-ui/records/list-item/record-list-item-action";
import RecordListItemContent from "@/ee09/json-db-ui/records/list-item/record-list-item-content";
import RecordListItemAvatar from "@/ee09/json-db-ui/records/list-item/record-list-item-avatar";
require("ee09/src/ee09/css/ee09-bg-grid.less")
export default {
  name: "image-field",
  components: {
    RecordListItemAvatar,
    RecordListItemContent,
    RecordListItemAction,
    FieldLabel,
    RecordListItem,
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
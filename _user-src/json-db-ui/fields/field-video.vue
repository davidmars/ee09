<template>
<div class="field-video mb-6">
  <field-label>{{label}}</field-label>
  <v-text-field filled
                v-model="field.userInput"
                :error-messages="field.getErrors().join(' ')"
                :hint="field.getErrors().join(' ')"
                :placeholder="field.getErrors().join(' ')"
                :prepend-inner-icon="providerIcon"
                :hide-details="field.getErrors().length===0"
  >
    <template v-slot:append>
        <record-create-btn
            small
            text="fichier"
            record-type="file"
            file-accept="video/*"
            @set-record-file="setFile"
        />
    </template>
  </v-text-field>
  <video-plyr
      v-if="field.getErrors().length===0"
      :options="plyrOptions"
      :source="field.getPlyrSource()"
      :language="$db.settings.currentLanguage.code"
  />
  <translated-files-field
      label="Sous titres"
      :field="field.subtitles"
      file-accept=".vtt"
  />




  <v-alert
      v-if="$dbUi.preferences.debugMode"
      :dark="debugVisible" :color="debugVisible ? 'info':'#fff'" tile>
    <div class="text-right">
      <v-icon @click="debugVisible=!debugVisible">mdi-bug</v-icon>
    </div>
    <div v-if="debugVisible">
      <h4 class="">Player info</h4>
      <pre>{{field}}</pre>
      <h4 class="mt-5">Errors</h4>
      <pre>{{field.getErrors()}}</pre>
      <h4 class="mt-5">Options</h4>
      <pre>{{plyrOptions}}</pre>
      <h4 class="mt-5">Sources</h4>
      <pre>sources: {{field.getPlyrSource()}}</pre>
    </div>

  </v-alert>

</div>
</template>

<script>
import FieldLabel from "./field-label";
import VideoPlyr from "ee09/src/ee09/vue/video-plyr";
import RecordCreateBtn from "../records/record-create-btn";
import TranslatedFilesField from "@/ee09/json-db-ui/fields/translated-files-field";
export default {
  name: "field-video",
  components: {
    TranslatedFilesField,
    RecordCreateBtn,
    VideoPlyr,
    FieldLabel,
    //VuePlyr
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
      debugVisible:false,
      plyrOptions:{
        autoplay:false,
        ratio:"2:1",
        controls:[
          'play-large'
          ,'play'
          ,'progress'
          ,'current-time'
          ,'mute'
          ,'volume'
          ,'captions'
          ,'settings'
        ],
        'captions':{
          active: true,
          language: window.$db.settings.currentLanguage.code,
          update: true
        }
      }

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
        me.field.userInput=record.dbUidString;
      }
    }
  },
  computed:{
    /**
     * Une icone différente en fonction du provider
     * @return {string}
     */
    providerIcon(){
      return this.field.providerMdiIcon;
    }
  }
}
</script>

<style lang="less">
  .field-video{
    .video-plyr{
      border: 1px solid #888;
    }
  }
</style>
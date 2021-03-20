<template>
<div class="field-video">
  <field-label>{{label}}</field-label>
  <v-text-field filled
                v-model="field.userInput"
                :error-messages="field.getErrors().join(' ')"
                :hint="field.getErrors().join(' ')"
                :placeholder="field.getErrors().join(' ')"
                :prepend-inner-icon="providerIcon"
  >
    <template v-slot:append>
        <record-create-btn
            small
            text="fichier"
            record-type="file"
            file-accept="video/*"
            @add-record-file="addFile($event)"
        />
    </template>
  </v-text-field>

  <video-plyr
      v-if="field.getErrors().length===0"
      :options="plyrOptions"
      :source="field.getPlyrSource()"
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
export default {
  name: "field-video",
  components: {
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
        ]
      }

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
            me.field.userInput=result.dbUidString;
          }
        );
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
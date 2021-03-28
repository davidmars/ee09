<template>
    <v-btn :class="cssClass"
           :icon="onlyIcon && !fab"
           :large="large"
           :small="small"
           :xLarge="xLarge"
           :xSmall="xSmall"
           :color="colorSmart.color" :dark="colorSmart.dark" :light="colorSmart.light"
           :fab="fab"
           @click.prevent="btnClick($event)"
    >
      <v-icon :left="!onlyIcon">{{icon}}</v-icon>
      <span v-if="text">{{text}} {{textStatus}}</span>

      <v-progress-circular
          v-if="schema.isFile && status === 'md5' "
          v-model="progress"
          :indeterminate="progress === null"
          color="white"
          class="ml-2" size="16" width="8"/>
      <input
          v-if="schema.isFile && displayFileInput"
          type="file" :multiple="multipleUploads" :accept="fileAccept"
          @click.stop="stopTheEvent"
          @change="uploadInputChange"
      >
    </v-btn>
</template>

<script>
export default {
  name: "record-create-btn",
  components: {},
  props:{
    large: {type:Boolean},
    dark: {type:Boolean},
    fab: {type:Boolean},
    small: {type:Boolean},
    xLarge: {type:Boolean},
    xSmall: {type:Boolean},
    text:{type:String,default:''},
    recordType: {type:String},
    color: {type:String},
    multipleUploads: {type:Boolean},
    fileAccept:{type:String,default: "*"},
  },
  data: () => ({
    displayFileInput:true,
    progress:undefined,
    status:undefined
  }),
  computed:{
    /**
     * @return {DbModelType}
     */
    schema(){
      return this.$db.settings.getModelType(this.recordType);
    },
    cssClass(){
      let c=["record-create-btn"];
      if(this.schema.isFile){
        c.push("upload-wrap");
      }
      return c.join(" ");
    },
    icon(){
      let i="mdi-plus-circle-outline";
      if(this.schema.isFile){
        i="mdi-cloud-upload-outline";
      }
      return i;
    },
    onlyIcon(){
      return this.text==='';
    },
    textStatus(){
      if(this.status==="md5"){
        return `Analyse ${Math.floor(this.progress)}%`
      }
      return "";
    },
    colorSmart(){
      if(this.status==="md5"){
        return {
          color:'orange',
          dark:true,
          light:false
        }
      }
      return {
        color:this.color,
        dark:false,
        light:true
      }
    }


  },
  methods:{
    /**
     * Appelé au click sur le bouton principal
     * @param event
     */
    btnClick(event){
      if(!this.schema.isFile){
        this.$emit('add-record',event)
      }
      this.stopTheEvent(event);

    },
    /**
     * Appelé au click sur l'input file'
     * @param event
     */
    uploadInputChange(event){
      let me=this;
      //Reset le file input
      this.displayFileInput=false;
      setTimeout(function(){
        me.displayFileInput=true;
      },100);

      for(let f of event.target.files){
        let task=this.$db.getFileRecord(f);
        task.on("PROGRESS",function(){
          me.progress=task.percent;
          me.status="md5";
        })
        task.on("RESULT",
            /**
             *
             * @param {DbRecordFile} result
             */
            function(result){

              console.log("result",result)
              me.progress=null;
              me.status=null;
              me.$emit('set-record-file',event,result);
            }
        );
      }



    },
    stopTheEvent(event){
      event.stopPropagation();
    }


  }
}
</script>

<style lang="less">
  .record-create-btn{
    &.upload-wrap{
      overflow: hidden;
      //pointer-events: none;
      cursor: pointer;
      input[type='file']{
        display: block !important;
        //pointer-events: all;
        opacity: 0;
        text-indent: 10000px;
        appearance: none;
        background-color: yellow;
        position: absolute !important;
        width: 150% !important;
        height: 150% !important;
        max-width: 150% !important;
        max-height: 150% !important;

        top: -25%;
        left: -25%;


        cursor: pointer;
        z-index: 10;
      }
    }
  }

</style>
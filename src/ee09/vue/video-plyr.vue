<template>
<div class="video-plyr">
  <video :id="htmlId"></video>
</div>
</template>

<script>
import Plyr from 'plyr';
const uniqid = require('uniqid');

export default {

  name: "video-plyr",
  props:{
    /**
     * Les options du plyr
     * @see https://github.com/sampotts/plyr#options
     */
    options:{
      type:Object
    },
    /**
     * La vidéo à jouer
     * @see https://github.com/sampotts/plyr#the-source-setter
     */
    source:{
      type:Object
    }
  },
  data:function(){
    return {
      htmlId:uniqid("video-plyr-"),
      player:null
    }
  },
  mounted() {
    this.buildPlayer()
  },
  methods:{
    buildPlayer(){
      let o={};
      if(!this.player){
        o= {...this.options};
        o.loadSprite=false;
        o.iconUrl=require('plyr/dist/plyr.svg');
        this.player = new Plyr("#"+this.htmlId,o);
        console.log("plyr options",o)
      }
      this.player.source=this.source;
      if(o.muted){
        this.player.muted=o.muted;
      }
    }
  },
  watch:{
    source(){
      this.buildPlayer()
    }
  }

}
</script>

<style lang="less">
@import "~plyr/dist/plyr.css";
.video-plyr{
  position: relative;
  min-width: 20px;
  min-height: 20px;
}
</style>
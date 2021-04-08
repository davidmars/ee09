<template>
  <div :style="`position: relative;background-color: ${bgColor}`">
    <div class="ee09-bg-grid-photoshop pa-16">

      <v-app-bar absolute color="transparent" elevation="0" dense>
        <v-spacer></v-spacer>
        <v-btn x-small
               v-for="hex of colors"
               :key="hex"
               :style="`--size:10px;${bgColor===hex?'border:2px solid blue;':''}`"
               elevation="5"
               class="ee09-bg-grid-photoshop ml-3"
               @click="bgColor=hex" :color="hex"
        >
        </v-btn>
      </v-app-bar>


      <v-img :aspect-ratio="16/9" contain
             :src="src"
      >
        <template v-slot:placeholder>
          <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
          >
            <v-progress-circular
                indeterminate
                color="pink"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
  </div>

</template>

<script>
require("ee09/src/ee09/css/ee09-bg-grid.less");
import RecordMixin from "../records/RecordMixin";

export default {
  name: "file-image-visualizer",
  mixins:[RecordMixin],
  data(){
    return{
      bgColor:"#FFF",
      colors:['#0F0','#F00','#FFF','#000']
    }
  },
  props:{
    src:{
      type:String
    }
  }

}
</script>

<template>
  <div>
    <v-text-field
        filled
        label="Name"
        v-model="recordObject.name"
    />
    <v-row>
      <v-col md="6">
        <field-mime-type label="Type de fichier" :field="recordObject.mime"/>
      </v-col>

      <v-col md="6">
        <field-bytes label="Poids" :field="recordObject.byteSize"/>
      </v-col>

      <v-col md="6">
        <v-text-field
            readonly disabled
            label="Emplacement"
            v-model="recordObject.path"
        />
      </v-col>

      <v-col md="6">
        <v-text-field
            readonly disabled
            label="Signature MD5"
            v-model="recordObject.md5"
        />
      </v-col>

      <v-col cols="12">

        <a :href="recordObject.href" target="_blank">
          <v-text-field
              readonly disabled
              label="Ouvrir le fichier"
              v-model="recordObject.href"

          />
        </a>
      </v-col>

      <!-- preview video -->
      <v-col v-if="recordObject.isVideo" cols="12">
        <video-plyr :source="videoSource"/>
      </v-col>
      <!-- preview image -->
      <v-col v-if="recordObject.isImage" cols="12">
        <file-image-visualizer
            :src="recordObject.resize.thumbnail(1024)"
        />
      </v-col>
    </v-row>

    <code-preview
        title="Données"
        :code="this.record"
        class="my-5"
    />

  </div>
</template>

<script>


import FieldBytes from "../fields/field-bytes";
import FieldMimeType from "../fields/field-mime-type";

import VideoPlyr from "ee09/src/ee09/vue/video-plyr";
import CodePreview from "../code-preview";
import FileImageVisualizer from "@/ee09/json-db-ui/components/file-image-visualizer";
export default {
  name: "file-edit",
  components: {FileImageVisualizer, CodePreview, VideoPlyr, FieldMimeType, FieldBytes},
  data(){
    return {
      videoSource:{
        type: 'video',
        sources: [{src: this.record.href}]
      }
      }
  },
  props:{
    record:{
      type:Object
    }
  },computed:{
    /**
     *
     * @return {DbRecordFile}
     */
    recordObject(){
      return this.record;
    }
  }
}
</script>


<template>
  <fragment @click="$emit('click')">
      <v-list-item-avatar color="grey lighten-3" tile >
        <v-img        v-if="record.adminThumb"
                      contain
                      :src="record.adminThumb"/>
        <record-icon  v-else
                      :record="record"></record-icon>
      </v-list-item-avatar>
      <v-list-item-content>
          <v-list-item-title>{{record.name}}</v-list-item-title>
          <v-list-item-action-text>
            <v-icon small v-if="record.adminSubtitleIcon">
              {{record.adminSubtitleIcon}}
            </v-icon>
            {{record.adminSubtitle}}
          </v-list-item-action-text>
          <v-list-item-action-text>
            <!--slot-->
            <slot name="more"></slot>
          </v-list-item-action-text>
      </v-list-item-content>
      <v-list-item-action>
          <div class="d-flex align-center">
            <!--slot-->
            <slot name="action"></slot>
          </div>
      </v-list-item-action>
  </fragment>
</template>

<script>
    import RecordIcon from "./record-icon";
    import { Fragment } from 'vue-fragment'
    export default {
        name: "record-list-item-inner",
        components: {RecordIcon,Fragment},
        props: {
            /**
             *  @type {DbRecord}
             */
            "record":{
                type:Object,
            },
            /**
             * Permet d'ajouter un lien ver la page d'édition
             */
            link:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{}
        },
        created(){},
        destroyed(){},
        computed:{

        },
        methods:{}
    }
</script>

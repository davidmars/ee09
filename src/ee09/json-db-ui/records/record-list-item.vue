<template>
    <v-list-item class="record-list-item"
                 :record-uid="record.uid"
                 dense
                 :disabled="disabled"
                 @click="$emit('click',$event,record)"
                 @dragstart="$emit('dragstart',$event,record)"
    >
        <record-list-item-inner :record="record">
          <template slot="more">
            <slot name="more"></slot>
          </template>
          <template slot="action">
            <slot name="action"></slot>
          </template>
        </record-list-item-inner>
    </v-list-item>
</template>

<script>
    import RecordListItemInner from "@/ee09/json-db-ui/records/record-list-iem-inner";
    export default {
        name: "RecordListItem",
      components: {RecordListItemInner},
      props: {
            /**
             * @type {DbRecord}
             */
            "record":{
                type:Object,
            },
            "disabled":{
                  type:Boolean
            }
        },
        data(){
            return{}
        },
        created(){},
        destroyed(){},
        computed:{},
        methods:{}
    }
</script>
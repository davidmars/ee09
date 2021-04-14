<template>
  <fragment @click="$emit('click')">
      <record-list-item-avatar :record="record"/>
      <record-list-item-content :record="record">
        <template slot="more">
          <slot name="more"></slot>
        </template>
      </record-list-item-content>
    <record-list-item-action :record="record">
      <template slot="action">
        <slot name="action"></slot>
      </template>
    </record-list-item-action>
  </fragment>
</template>

<script>
    import { Fragment } from 'vue-fragment'
    import RecordListItemAvatar from "@/ee09/json-db-ui/records/list-item/record-list-item-avatar";
    import RecordListItemContent from "@/ee09/json-db-ui/records/list-item/record-list-item-content";
    import RecordListItemAction from "@/ee09/json-db-ui/records/list-item/record-list-item-action";
    export default {
        name: "record-list-item-inner",
        components: {RecordListItemAction, RecordListItemContent, RecordListItemAvatar,Fragment},
        props: {
            /**
             *  @type {DbRecord}
             */
            "record":{type:Object},
            /**
             * Permet d'ajouter un lien ver la page d'édition
             */
            link:{type:Boolean,default:false}
        },
    }
</script>

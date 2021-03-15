<template>

  <div class="record-table-line mb-1"
       v-bind:class="{ 'open': open,'elevation-5':open, 'pa-5 my-5 mb-10':open }">
      <record-list-item
          :record="record"
          @click="open=!open"
      >
        <template v-slot:action>
          <slot v-if="open" name="action"></slot>
          <v-btn icon @click.stop="open=!open" class="ml-4 chevron">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
      </record-list-item>
    <component
        v-if="open"
        class="my-5"
        :record="record"
        :is="$db.settings.getModelType(record.type).editComponent">
    </component>
  </div>

</template>

<script>
import RecordListItem from "@/ee09/json-db-ui/records/record-list-item";
export default {
name: "record-table-line",
  components: {RecordListItem},
  props: {
    /**
     *  @type {DbRecord}
     */
    "record":{
      type:Object,
    }
  },
  data(){
    return{
      open:false
    }
  }
}
</script>

<style lang="less">
  .record-table-line{
    transition: padding 0.2s, box-shadow 0.5s;
    .chevron{
      transition: transform 0.25s;
    }
    &.open{
      .chevron{
        transform: rotate(180deg);
      }
    }
  }
</style>
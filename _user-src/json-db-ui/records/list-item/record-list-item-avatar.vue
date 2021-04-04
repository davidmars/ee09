<template>
  <v-list-item-avatar color="" tile >
    <v-img        v-if="record.adminThumb"
                  contain
                  :src="record.adminThumb"/>
    <record-icon  v-else
                  :record="record"/>
  </v-list-item-avatar>
</template>

<script>
import RecordIcon from "../record-icon"
import RecordMixin from "../RecordMixin";
export default {
  name: "record-list-item-avatar",
  components:{RecordIcon},
  mixins:[RecordMixin]
}
</script>
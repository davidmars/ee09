<template>
  <v-list-item-action>
    <div class="d-flex align-center">
      <!--slot-->
      <slot name="action"></slot>
    </div>
  </v-list-item-action>
</template>

<script>
import RecordMixin from "../RecordMixin";

export default {
  name: "record-list-item-action",
  mixins:[RecordMixin]
}
</script>

<style scoped>

</style>
<template>
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
</template>

<script>
import RecordMixin from "../RecordMixin";

export default {
name: "record-list-item-content",
  mixins:[RecordMixin]
}
</script>

<template>
  <v-text-field
      readonly disabled
      :label="label"
      v-model="field"
      :prepend-icon="icon"
  />
</template>

<script>
export default {
  name: "field-mime-type",
  props:{
    label:{
      type:String
    },
    field:{
      type:String
    }
  },
  computed:{
    icon() {
      return this.$db.utils.file.mdiIcon(null,this.field);
    }
  }
}
</script>

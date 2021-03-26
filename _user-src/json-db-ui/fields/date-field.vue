<template>
  <v-text-field
      type="datetime-local"
      filled
      :label="label"
      v-model="f.isoString"
      :hint="f.isoString"
      persistent-hint
  />
</template>

<script>
export default {
name: "date-field",
  props:{
    label:{
      type:String
    },
    field:{
      type:Object
    }
  },
  computed:{
    /**
     *
     * @return {DateField}
     */
    f(){
      return this.field
    }
  }

}
</script>

<style scoped>

</style>
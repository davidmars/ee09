<template>
  <div>
    <v-text-field
        :label="label"
        :value="humanValue"
        :readonly="true"
        :disabled="true"
        type="text"
        persistent-hint
        :hint="Number(bytes).toLocaleString()+' bytes'"
    />
  </div>
</template>

<script>

export default {
name: "field-bytes",
props:{
  label:{
    type:String
  },
  field:{
    type:Number
  }
},
computed:{
  humanValue(){
    return this.$db.utils.file.humanSize(this.bytes);
  },
  bytes(){
    return Number(this.field);
  }
}
}
</script>

<template>
  <div>
    <v-alert v-if="$dbUi.preferences.debugMode"
             color="#222" dark tile
    >
      <h4 v-if="title" class="mb-5">{{title}}</h4>
      <pre v-if="code">{{code}}</pre>
      <pre v-else><slot></slot></pre>
    </v-alert>
  </div>
</template>

<script>
export default {
name: "code-preview",
  props:["title","code"]
}
</script>

<style scoped>

</style>
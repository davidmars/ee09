<template>
    <div class="mt-5">
      <field-label v-if="label" class="mb-2">{{label}}</field-label>
        <v-row>
          <v-col v-for="lang in $db.settings.languages" :key="lang.code" :cols="col">
            <file-field
                :field="field[lang.code]"
                :file-accept="fileAccept"
            >
                     <template slot="prepend">
                       <v-img :src="lang.flagImg" width="24" height="24" contain class="mr-2"/>
                     </template>
            </file-field>
          </v-col>
        </v-row>
    </div>
</template>

<script>
    import FieldLabel from "./field-label";
    import FileField from "@/ee09/json-db-ui/fields/file-field";
    export default {
      name: "translated-files-field",
      components: {FileField, FieldLabel},
      props:{
        label:{type:String},
        field:{type:Object},
        col:{type:String,default:"12"},
        fileAccept:{type:String,default: "*"},
      },
    }
</script>

<style></style>
<template>
    <div>
      <field-label>{{label}}</field-label>
        <v-row>
          <v-col v-for="lang in $db.settings.languages" :key="lang.code" :cols="col">
            <v-textarea
              v-model="field[lang.code]"
              required
              filled
            >
              <template v-slot:append>
                <v-img :src="lang.flagImg" width="24" height="24" contain/>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
    </div>

</template>

<script>
    import FieldLabel from "./field-label";
    export default {
      name: "translated-textarea-field",
      components: {FieldLabel},
      props:{
        label:{
          type:String
        },
        field:{
            type:Object
        },
        col:{
          type:String,
          default:""
        }
      },
    }
</script>

<style></style>
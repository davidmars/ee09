<template>
    <div>
      <field-label>{{label}}</field-label>
        <v-row>
          <v-col v-for="lang in $db.settings.languages" :key="lang.code" :cols="col">
            <v-text-field
              v-model="field[lang.code]"
              required
              filled
            >
              <template v-slot:append>
                <v-img :src="lang.flagImg" width="24" height="24" contain/>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
    </div>

</template>

<script>
    import FieldLabel from "@/ee09/json-db-ui/fields/field-label";
    export default {
      name: "translated-text-field",
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
<template>
  <v-dialog
      light
      class="admin-dialog"
      v-model="$dbUi.visible"
      fullscreen
      hide-overlay
      scrollable
      transition="dialog-top-transition"
  >

    <admin-dialog-nav/>

    <div class="admin-dialog-content">
      <v-card class="ma-10 pa-5">
        <v-card-text>
          <!-- single record -->
          <div v-if="$dbUi.currentScreen==='single-record'">
            <v-card>
              <v-card-title>
                <v-spacer/>
                <btns-record-action :record="$dbUi.singleRecord"/>
              </v-card-title>
              <component
                  class="pa-5 mb-5"
                  :record="$dbUi.singleRecord"
                  :is="$db.settings.getModelType($dbUi.singleRecord.type).editComponent">
              </component>
            </v-card>

          </div>

          <!-- liste de records -->
          <div v-if="$dbUi.currentScreen==='records'">

            <record-table-line v-for="record of $db.getListType($dbUi.currentRecordsTypes)"
                               :key="record.uid"
                               :record="record">
              <template slot="action">
                <btns-record-action :record="record"/>
              </template>
            </record-table-line>
            <!--
            <v-card v-for="record of $db.getListType($dbUi.currentRecordsTypes)" :key="record.uid" tile>
              <v-card-title>
                <v-spacer/>

              </v-card-title>
              <component
                  class="pa-5 mb-5"
                  :record="record"
                  :is="$db.settings.getModelType(record.type).editComponent">
              </component>
            </v-card>
            -->
          </div>

          <!-- settings -->
          <json-db-settings v-if="$dbUi.currentScreen==='settings'"/>

        </v-card-text>
      </v-card>





    </div>

  </v-dialog>
</template>

<script>


import JsonDbSettings from "./json-db-settings";
import AdminDialogNav from "./nav/admin-dialog-nav";
import RecordTableLine from "./records/record-table-line";
import BtnsRecordAction from "./records/btns/btns-record-action";
export default {
  name: "admin-dialog",
  components: {BtnsRecordAction, RecordTableLine, AdminDialogNav, JsonDbSettings},
  data () {
    return {
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  methods:{}
}
</script>

<style lang="less">

    .admin-dialog-content,.admin-dialog-nav{
      --left-w:300px;
      --top-h:65px;
    }

    .admin-dialog-nav{

      >.top,.left{
        z-index: 1;
        position: fixed;
      }
      >.top{
        top: 0;
        width: 100%;
      }
      >.left{
        width: var(--left-w);
        top: var(--top-h);
        height: calc( 100% - var(--top-h));
        background-color: #F5F5F5;
        .bottom{
          position: absolute;
          bottom: 0;
          width: 100%;
        }
      }
    }
    .admin-dialog-content{
      background-color: #DFDFDF;
      position: absolute;
      min-height: calc( 100vh - var(--top-h));
      padding-left: var(--left-w);
      top: var(--top-h);
      //width: calc(100% - 300px);
    }

</style>
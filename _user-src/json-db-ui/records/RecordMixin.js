export default {
    props: {
        /**
         *  @type {DbRecord}
         */
        "record":{type:Object},
    },
    computed:{
        /**
         * Le record mais spécialement typé DbRecord pour l'autocomplétions de code
         * @return {DbRecord}
         */
        rec(){
            return this.record;
        },
        /**
         * Le record mais spécialement typé DbRecordFile pour l'autocomplétions de code
         * @return {DbRecordFile}
         */
        recFile(){
            return this.record;
        }
    }
}
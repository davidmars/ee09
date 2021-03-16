import EE09obj from "./utils/EE09obj";
import EE09urlAnalyzer from "./utils/EE09urlAnalyzer";

export default class EE09{
    constructor() {
        this.utils=new EE09obj();
        this.urlAnalyzer=new EE09urlAnalyzer();
    }
}
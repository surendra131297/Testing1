import { LightningElement ,api,wire} from 'lwc';
import salesemp from '@salesforce/apex/Sales_manager.getSales';

export default class SalesSearchPage extends LightningElement {
    @api searchstring='';
    @api salesemp=[];

    @wire(salesemp, {searchValues:'$searchstring'})sales;
    handlesearch(event){
        this.searchstring=event.target.value;
    }
}
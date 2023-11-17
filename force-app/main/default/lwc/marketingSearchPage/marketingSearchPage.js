import { LightningElement,api,wire } from 'lwc';
import Marketing from '@salesforce/apex/Marketing_manager.getMarketing';
export default class MarketingSearchPage extends LightningElement {
    @api searchstring='';
    @api Marketing=[];

    @wire(Marketing, {searchValues:'$searchstring'})Marketing;
    handlesearch(event){
        this.searchstring=event.target.value;
    }
}
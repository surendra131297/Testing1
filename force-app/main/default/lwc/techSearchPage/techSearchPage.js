import { LightningElement,api,wire } from 'lwc';
import techemp from '@salesforce/apex/Technical_manager.getTech';
export default class TechSearchPage extends LightningElement {
    @api searchstring='';
    @api techemp=[];

    @wire(techemp, {searchValues:'$searchstring'})tech;
    handlesearch(event){
        this.searchstring=event.target.value;
    }
}
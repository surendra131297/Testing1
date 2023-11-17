import { LightningElement } from 'lwc';

export default class MasterComponent extends LightningElement {

    selectedPartnerTypeId = '';
    handleselectedpartnertypeEvent(event)
    {
        this.selectedPartnerTypeId=event.detail;
    }
}
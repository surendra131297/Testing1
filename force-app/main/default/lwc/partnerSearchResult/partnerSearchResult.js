import { LightningElement ,wire , api} from 'lwc';
import getPartnerType from '@salesforce/apex/Performance_Partner_Management.getPartners';

export default class PartnerSearchResult extends LightningElement {

    //public property that recieves selected partner type Id
   @api channelPartnerTypeId;

   // property to hold selected partner account id recieved from child component(partner Card)
   selectedPartnerCardAccountId;
   // local property to hold all partner from DB
    partnerDataFromDB;

    @wire (getPartnerType,{partnerTypeId:'$channelPartnerTypeId'})
    processOutput({data,error})
    {
        if(data)
        {
            console.log('Data from DB :: ' + JSON.stringify(data));
            this.partnerDataFromDB = data;
        }
        else if(error)
        {
            console.log('Error' + error.body.message)
        }
    }
    get isPartnerfound()
    {
        if(this.partnerDataFromDB != null && this.partnerDataFromDB.length > 0)
        {
            return true;
        }
        return false;
    }
    selectedPartnerHandler(event)
    {
        const partnerId = event.detail;
        this.selectedPartnerCardAccountId = partnerId;
    }
}
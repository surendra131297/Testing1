import { LightningElement ,wire} from 'lwc';
import fetchPartnerType from '@salesforce/apex/Performance_Partner_Management.partnertype';
import { NavigationMixin } from 'lightning/navigation';

export default class PartnerSearch extends NavigationMixin(LightningElement) {

    appdecs='Partner relationship management (PRM) is a combination of the software, processes and strategies companies use to streamline business processes with partners that sell their products.';

    

    partnerTypes;
   
    handleChange(event) {
        
        const partnerTypeId = event.detail.value; // get selected channel partner id
    // Create & Dispatch custom event so that Selected channel partner id is sent to masterComponent 
        const partnerTypeSelectedChangeEvent = new CustomEvent('selectedpartnertype', {detail : partnerTypeId});
        this.dispatchEvent(partnerTypeSelectedChangeEvent);
    }

    @wire(fetchPartnerType)
    processOutput({data,error})
    {
        if(data)
        {
           this.partnerTypes = [{label:'....Select Partner Types...',value:''}];

           //loop the data and change object Keys
           data.forEach(item => {
            const partnerType={}
             partnerType.label=item.Name;
             partnerType.value=item.Id;

             this.partnerTypes.push(partnerType);
           })
           console.log('Partner Type : ' + JSON.stringify(data));
        }
        else if(error)
        {
            console.log('Error  :' + error.body.message);
        }
    }

    openNewPartnertypestdpage()
    {
        const inputparams = {
            type : 'standard__objectPage',
            attributes : {
                actionName : 'new',
                objectApiName : 'Partner_Type__c'

            }
        };
        this[NavigationMixin.Navigate](inputparams);
    }
    openNewPartnerAccountstdpage()
    {
        const inputparams = {
            type : 'standard__objectPage',
            attributes : {
                actionName : 'new',
                objectApiName : 'Account'

            }
        };
        this[NavigationMixin.Navigate](inputparams);
    }
    openNewPartnerContactstdpage()
    {
        const inputparm = {
            type : 'standard__objectPage',
            attributes : {
                actionName : 'new',
                objectApiName : 'Contact'

            }
        };
        this[NavigationMixin.Navigate](inputparm);
    }
}
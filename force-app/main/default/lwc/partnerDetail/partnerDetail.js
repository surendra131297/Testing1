import { LightningElement ,wire} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_CONTRACT_START from '@salesforce/schema/Account.Partner_Contract_Start_Date__c';
import PARTNER_PRIMARY_POC_FIELD from '@salesforce/schema/Account.Partner_Primary_POC__c';
import PARTNER_BUDGET_FIELD from '@salesforce/schema/Account.Partner_Budget__c';
import PARTNER_TOTAL_SALES_REVENUE_FIELD from '@salesforce/schema/Account.Partner_Total_Sales_Revenue__c';
import PARTNER_ACTIVE_PIPELINE_VALUE_FIELD from '@salesforce/schema/Account.Partner_Active_Pipeline_Value__c';
import PARTNER_CONTRACT_END_DATE_FIELD from '@salesforce/schema/Account.Partner_Contract_End_Date__c';
import NUMBER_OF_TRAINED_PARTNER_CONTACTS_FIELD from '@salesforce/schema/Account.Number_of_Trained_Partner_Contacts__c';
import PARTNER_LATITTUDE_FIELD from '@salesforce/schema/Account.Partner_Geo_Location__c';
import PARTNER_LONGITUDE_FIELD from '@salesforce/schema/Account.Partner_Geo_Location__c';

// import Message Channel
import Partner_Channel from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';
// import functions to publish data
import {subscribe , unsubscribe , MessageContext} from 'lightning/messageService';
import { NavigationMixin } from 'lightning/navigation';

export default class PartnerDetail extends NavigationMixin(LightningElement) {
    objectApi = 'Account';
    selectedPartnerAccountId ; //= '0015j00000j5uFFAAY';
    channelname;
    selectedPartnerAccountName;
    subscription;
     // LMS- After import make a wire call to MessageContext
     @wire(MessageContext)Context;

    showLocation = false; // property to hold flag for open contact Location
    
    accountName = ACCOUNT_NAME;
    accContractStartDate = ACCOUNT_CONTRACT_START;
    primarypoc = PARTNER_PRIMARY_POC_FIELD;
    budget = PARTNER_BUDGET_FIELD;
    salesRevenue = PARTNER_TOTAL_SALES_REVENUE_FIELD;
    activepipeline = PARTNER_ACTIVE_PIPELINE_VALUE_FIELD;
    contractEnd = PARTNER_CONTRACT_END_DATE_FIELD;
    totalTrained = NUMBER_OF_TRAINED_PARTNER_CONTACTS_FIELD;
    partnerLatittude = PARTNER_LATITTUDE_FIELD;
    partnerLongitude = PARTNER_LONGITUDE_FIELD;

    connectedCallback()
    {
        if(this.subscription){
            return;
        }
this.subscription = subscribe(this.Context,Partner_Channel,(message)=>{this.handleMessage(message);})
    }
    handleMessage(message)
    {
        this.selectedPartnerAccountId = message.selectedPartnerAccountId;
        this.selectedPartnerAccountName = message.selectedPartnerAccountName;
        this.channelname = message.channelname;
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription= null;
    }

    get isPartnerSelected()
    {
        if(this.selectedPartnerAccountId != null && this.selectedPartnerAccountId.length > 0)
        {
            return true;
        }
        return false;
    }

    OpenContactLocation()
    {
        this.showLocation=true;
    }
    OpenPartnerReviewScreenFlow()
    {
        // use navigation mixin and redirect user to flow screen
       // const flowURL = "/flow/Partner_Review?recordId=" + this.selectedPartnerAccountId;

        //configure input param
        const inputparams = {
            type : 'standard__webPage',
            attributes : {
                url : "/flow/Partner_Review?recordId=" + this.selectedPartnerAccountId

            }
        };
        this[NavigationMixin.Navigate](inputparams);
    }
}
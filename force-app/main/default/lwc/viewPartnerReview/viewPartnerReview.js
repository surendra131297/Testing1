import { LightningElement,wire} from 'lwc';
import getPartnerReviews from '@salesforce/apex/Performance_Partner_Management.getPartnerReviews';

// import Message Channel
import Partner_Channel from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';
// import functions to publish data
import {subscribe , unsubscribe , MessageContext} from 'lightning/messageService';

export default class ViewPartnerReview extends LightningElement {

    partnerAccountId; // = '0015j00000j5uFFAAY';
    channelname;
    selectedPartnerAccountName;
    subscription;
     // LMS- After import make a wire call to MessageContext
     @wire(MessageContext)Context;

    partnerReviews = null;
    partner;
    recordIndex = 0;

    connectedCallback()
    {
        if(this.subscription){
            return;
        }
this.subscription = subscribe(this.Context,Partner_Channel,(message)=>{this.handleMessage(message);})
    }
    handleMessage(message)
    {
        this.partnerAccountId = message.selectedPartnerAccountId;
        this.selectedPartnerAccountName = message.selectedPartnerAccountName;
        this.channelname = message.channelname;
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription= null;
    }

  @wire(getPartnerReviews,{partnerAccountId: '$partnerAccountId'})
  processOutput({data,error})
  {
  if(data)
  {
    this.partnerReviews=data;  // assign data from DB to a local property reviews collection.

    if(this.partnerReviewsFound)
    {
        this.getCurrentPartnerReview();
    }
  } 
  else if (error){
    console.log('Error');
  }
  }
  getCurrentPartnerReview()
  {
    this.partner = this.partnerReviews[this.recordIndex]; // first record in Record view collection
  }

  navigateNextReview(){
    this.recordIndex++;
    this.getCurrentPartnerReview();
  }

  navigatePreviousReview(){
    this.recordIndex--;
    this.getCurrentPartnerReview();
  }
  get partnerReviewsFound()
    {
        if(this.partnerReviews != null && this.partnerReviews.length > 0)
        {
            return true;
        }
        return false;
    }
  

}
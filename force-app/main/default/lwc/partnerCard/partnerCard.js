									
import { LightningElement ,api , wire} from 'lwc';
// import Message Channel
import Partner_Channel from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';
// import functions to publish data
import {publish , MessageContext} from 'lightning/messageService';

export default class PartnerCard extends LightningElement {


    showImageEditor = false;
@api partnerAccount; // public property to recieve data from partner search result
@api selectedPartnerAccountId;
channelPartnerStyle = 'slds-theme_offline';
// usrImg ='https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';

isShowModal = false;
handleEditImage(){
    this.isShowModal = true;
}
hideModalBox() {  
        this.isShowModal = false;
    }
// LMS- After import make a wire call to MessageContext
@wire(MessageContext)Context;

// card style property
// partnerCardStyle;
connectedCallback()
{
    this.getPartnerTypeStyle(this.partnerAccount.Partner_Type_Lookup__r.Name);
    //this.getUserImage(this.partnerAccount.Partner_Primary_POC__r.Salutation);
}

getPartnerTypeStyle(partnerType){
    switch(partnerType){
        case 'Technology Partner' :
        this.channelPartnerStyle = 'slds-theme_success';
        break;
        case 'Social Media Channel Partner' :
            this.channelPartnerStyle = 'slds-theme_info';
            break;
        case 'Affiliates' :
            this.channelPartnerStyle = 'slds-theme_inverse';
            break;
        default :
        this.channelPartnerStyle = 'slds-theme_offline';
        break;
    }
}

/* getUserImage(salutation){
    const randomId = Math.floor(Math.random() * 100);
    switch(salutation){
        case 'Mr.' :
            this.usrImg = `https://randomuser.me/api/portraits/men/${randomId}.jpg` ;
            break;
        case 'Ms.' :
            this.usrImg = `https://randomuser.me/api/portraits/women/${randomId}.jpg`;
            break;
        default :
        this.usrImg = `https://www.lightningdesignsystem.com/assets/images/avatar2.jpg`;
        break;
    }
} */


handleSelectedPartnerAccount(){
    //storing partner Account Id in a local variable
    const partnerAccountId = this.partnerAccount.Id;
    // to highlight the selected partner card, expose an event and send selected partner account Id to the parent component
    const partnerAccountSelect = new CustomEvent('partnerselect',{detail: partnerAccountId});
    this.dispatchEvent(partnerAccountSelect);

    // Step -1 for LMS by using this we can publish this to subscriber(partnerDetail)

   const message = {
    selectedPartnerAccountId : this.partnerAccount.Id ,
    channelname : "Partner Account" ,
    selectedPartnerAccountName : this.partnerAccount.Name
    }
    publish(this.Context,Partner_Channel,message);
  }


get partnerCardStyle()
  {
    if(this.partnerAccount.Id === this.selectedPartnerAccountId)
  {
    return "tile selected"
 }
    return "tile";
}

imageData;

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imageData = reader.result;
                const imageUploadEvent = new CustomEvent('imageuploaded', {
                    detail: this.imageData
                });
                this.dispatchEvent(imageUploadEvent);
            };
            reader.readAsDataURL(file);
        }
    }

}
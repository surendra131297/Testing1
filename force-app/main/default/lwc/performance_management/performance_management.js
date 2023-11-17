import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
export default class Performance_management extends LightningElement {

checkUserMarketProfile = false;
checkUserTechProfile = false;
checkUserSalesProfile = false;


     @wire(CurrentPageReference)
    currentPageReference;

    // Method to check the user's profile
    checkUserMarketProfile() {
        const profile = this.currentPageReference && this.currentPageReference.attributes && this.currentPageReference.attributes.profileName;
        return profile === 'Marketing Employee Profile';
    }

    @wire(CurrentPageReference)
    currentPageReference;

    // Method to check the user's profile
    checkUserTechProfile() {
        const profile = this.currentPageReference && this.currentPageReference.attributes && this.currentPageReference.attributes.profileName;
        return profile === 'Tech Employee Profile';
    }

    @wire(CurrentPageReference)
    currentPageReference;

    // Method to check the user's profile
    checkUserSalesProfile() {
        const profile = this.currentPageReference && this.currentPageReference.attributes && this.currentPageReference.attributes.profileName;
        console.log('Current Profile: ' + profile);
        return profile === 'Sales Employee Profile';
    }

}
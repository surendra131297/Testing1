import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
// import { getRecord } from 'lightning/uiRecordApi';

export default class MarketingAssesmentObj extends LightningElement {
    strRecordId;

    arrayFields = ['Assesment_Year__c','Emp_Name__c','Employee_Id__c', 'Completiondate__c', 'Phone_No__c', 'Email__c',
                   'Milestone1__c','Rating1__c','Milestone2__c','Rating2__c','Milestone3__c','Rating3__c','Milestone4__c',
                   'Rating4__c','Employee_Comments__c'];

                   // Wire to get the user's profile information
    @wire(CurrentPageReference)
    currentPageReference;

    // Method to check the user's profile
    checkUserProfile() {
        const profile = this.currentPageReference && this.currentPageReference.attributes && this.currentPageReference.attributes.profileName;
        return profile === 'Marketing Employee Profile';
    }
}
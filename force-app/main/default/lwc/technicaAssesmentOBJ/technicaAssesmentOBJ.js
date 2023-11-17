import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class TechnicaAssesmentOBJ extends LightningElement {
    strRecordId;

    arrayFields = ['Assesment_Year__c','Emp_Name__c','Emp_Id__c', 'Completion_Date__c', 'Phone_No__c', 'Email__c',
                   'Milestone_1__c','Rating1__c','Milestone_2__c','Rating2__c','Milestone_3__c','Rating3__c',
                   'Milestone_4__c','Rating4__c','Employee_Comments__c'];

                                    // Wire to get the user's profile information
    @wire(CurrentPageReference)
    currentPageReference;

    // Method to check the user's profile
    checkUserProfile() {
        const profile = this.currentPageReference && this.currentPageReference.attributes && this.currentPageReference.attributes.profileName;
        return profile === 'Tech Employee Profile';
    }

}
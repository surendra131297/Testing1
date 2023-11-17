import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class SalesAssesmentObj extends LightningElement {
    strRecordId;

    arrayFields = ['Assesment_Year__c','Emp_Name__c','Emp_Id__c', 'CompletionDate__c', 'Phone_No__c', 'Email__c', 'Cus_Response_Rating__c',
                'Personal_Appereance_Rating__c','LeadershipRating__c','Manage_Change_Rating__c','Milestone1__c','Rating1__c','Milestone2__c',
               'Rating2__c', 'Milestone3__c','Rating3__c','Milestone4__c','Rating4__c', 'Employee_Comments__c'];

                                                  // Wire to get the user's profile information
    @wire(CurrentPageReference)
    currentPageReference;

    // Method to check the user's profile
    checkUserProfile() {
        const profile = this.currentPageReference && this.currentPageReference.attributes && this.currentPageReference.attributes.profileName;
        return profile === 'Sales Employee Profile';
    }
}
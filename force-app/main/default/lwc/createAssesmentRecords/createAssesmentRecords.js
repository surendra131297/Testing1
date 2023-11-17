import { LightningElement } from 'lwc';

export default class CreateAssesmentRecords extends LightningElement {
    strRecordId;

    arrayFields = ['Name','Emp_Id__c', 'Completion_Date__c', 'Phone_No__c', 'Email__c', 'Cus_Response_Rating__c',
                'Personal_Appearence_Rating__c','LeadershipRating__c','Manage_Change_Rating__c','Milestone1__c','Milestone2__c',
                'Milestone3__c','Milestone4__c',  'Employee_Comments__c','Date_of_Birth__c'];

}
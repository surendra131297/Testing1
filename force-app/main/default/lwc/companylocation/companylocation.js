import { LightningElement,wire } from 'lwc';
import  EmpStatus from '@salesforce/apex/Employee.EmpStatus'
const  c = [
      {label:"Employee Id",fieldName:"Wissen_Employee_ID__c"},
      {label:"Employee First Name",fieldName:"Name"},
      {label:"Employee Last Name",fieldName:"Last_Name__c"},
      {label:"Employee Company Location",fieldName:"Company_Location__c"}
    
 ];
export default class Companylocation extends LightningElement
{
    col = c;
    @wire(EmpStatus) mydata;
}
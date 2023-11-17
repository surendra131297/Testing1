public class Employee {
   
    @AuraEnabled(cacheable=true)
    public static list<	Wissen_Employee__c> EmpStatus()
    {
        list<Wissen_Employee__c> yy =new list<Wissen_Employee__c>();
        yy = [select id,Wissen_Employee_ID__c,Name,Last_Name__c,Emp_Status__c,Company_Location__c from Wissen_Employee__c];
        return yy;
    }

}
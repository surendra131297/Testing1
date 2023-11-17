public with sharing class Sales_manager
{
    @AuraEnabled(cacheable=true)
    public static list<sale1_Assessment__c> getSales(string searchValues)
    {
        
            string str1= '%'+searchValues+'%';
            return[select id,Emp_Name__c,Emp_Id__c,Email__c,CompletionDate__c,Status__c from sale1_Assessment__c where Emp_Name__c like :str1];
        
    }
    

}
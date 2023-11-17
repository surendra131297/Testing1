public  with sharing class Marketing_manager 
{
    @AuraEnabled(cacheable=true)
    public static list<Marketing_Assesment__c> getMarketing(string searchValues)
    {
       
            string str1= '%'+searchValues+'%';
            return[select id,Emp_Name__c,Employee_Id__c,Email__c,Completiondate__c,Status__c from Marketing_Assesment__c where Emp_Name__c like :str1];
       
    }
   

}
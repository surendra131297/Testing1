public  class Technical_manager 
{
    @AuraEnabled(cacheable=true)
    public static list<Technical_Assessment__c> getTech(string searchValues)
    {
       
        
            string str1= '%'+searchValues+'%';
            return[select id,Emp_Name__c,Emp_Id__c,Completion_Date__c,	Email__c,Status__c from Technical_Assessment__c where Emp_Name__c like :str1];
        
       
           
        
    }
     
    }
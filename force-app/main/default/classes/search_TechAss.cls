public class search_TechAss {
public string searchbox{get;set;}
    public list<Technical_Assessment__c>Result {get;set;}
    
    public  void  getTech()
    {
        result =new list<Technical_Assessment__c>();
       
            string str1= '%'+searchbox+'%';
           string str2 = 'select Comments2__c,Emp_Name__c,Emp_Id__c,Email__c,Completion_Date__c,Status__c,Assesment_Year__c,Rating1__c,Rating2__c,Rating3__c,Rating4__c from Technical_Assessment__c where Emp_Name__c like :str1';
       result=database.query(str2);
    }
    
     @AuraEnabled(cacheable=true)
   
    public static List<Tech_Milestones__c > getButtonNames(){
        return [Select Id,Name from Tech_Milestones__c];     
    }
  
}
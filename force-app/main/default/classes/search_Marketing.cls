public class search_Marketing {
  
    public string searchbox1{get;set;}
    public list<Marketing_Assesment__c> result{get;set;}
    
   public  void  getMarketing()
    {
        result =new list<Marketing_Assesment__c>();
       
            string str1= '%'+searchbox1+'%';
           string str2 = 'select Comments2__c,Emp_Name__c,Employee_Id__c,Email__c,Completiondate__c,Status__c,Assesment_Year__c from Marketing_Assesment__c where Emp_Name__c like :str1';
       result=database.query(str2);
    } 
      @AuraEnabled(cacheable=true)
   
    public static List<Marketing_Milestones__c > getButtonNames(){
        return [Select Id,Name from Marketing_Milestones__c ORDERBY];     
    }
    
}
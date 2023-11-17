public class search_SalesASS {
public string searchbox1{get;set;}
    public list<sale1_Assessment__c>Result {get;set;}
    
    public  void  getSales()
    {
        result =new list<sale1_Assessment__c>();
       
            string str1= '%'+searchbox1+'%';
           string str2 = 'select Employee_Comments__c,Emp_Name__c,Emp_Id__c,Email__c,CompletionDate__c,Status__c,Assesment_Year__c from sale1_Assessment__c where Emp_Name__c like :str1';
       result=database.query(str2);
    } 
    
     @AuraEnabled(cacheable=true)
   
    public static List<Sales_Milestones__c > getButtonNames(){
        return [Select Id,Name from Sales_Milestones__c ORDERBY];     
    }
    
   
}
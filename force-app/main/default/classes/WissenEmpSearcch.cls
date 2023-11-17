public class WissenEmpSearcch {
    
     @AuraEnabled
    public static list<	Wissen_Employee__c> getrecords(string i_WissenSerch)
    {
        string str11='%' + i_WissenSerch+ '%';
        list<Wissen_Employee__c> lstemp=new list<Wissen_Employee__c>();
        string str='Select Active_Role__c,Wissen_Employee_ID__c,Working_Email__c,Company_Location__c,Country__c,Date_of_Joining__c,Designation__c,Name,Level__c,Role__c from Wissen_Employee__c where Name like :str11 OR Wissen_Employee_ID__c like :str11 OR Working_Email__c like :str11 OR Designation__c like :str11 OR Company_Location__c like :str11 OR Role__c like :str11 OR Active_Role__c like :str11' ;
        lstemp=database.query(str);
return lstemp;
    }
    

}
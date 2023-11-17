public class Cert_Query {
 @auraEnabled
     public static list<Certification__c> getrecords(string i_SearchCert)
    {
       string str11='%' + i_SearchCert+ '%';
// string empid1='%' + Empid+ '%';
list<Certification__c> lstcert=new list<Certification__c>();

string str='SELECT Employee_Id__c,Name,Credential_Id__c, Certification_Date__c,Wissen_Employee__r.Name,Certification_Email__c FROM Certification__c where Employee_Id__c like :str11 OR Name like :str11 OR Wissen_Employee__r.Name like :str11 ';
lstcert=database.query(str);
return lstcert;
}

}
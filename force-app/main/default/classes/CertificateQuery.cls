public class CertificateQuery {
@auraEnabled
public static list<Certification__c> recordcert()
{
    list<Certification__c> cert=[select Credential_Id__c,Name,Certification_Email__c,Employee_Id__c,Wissen_COE__c,Wissen_Employee__r.Name,Certification_Date__c,Manager_Email_Id__c from Certification__c];
    return cert;
    
}
   }
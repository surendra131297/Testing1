public class Performance_Partner_Management {
    
    @AuraEnabled(cacheable=True)
     public static List<Partner_Type__c> partnertype()
    {
        List<Partner_Type__c> par =new list<Partner_Type__c>();
        par = [select id,Name from Partner_Type__c];
        system.debug('partner types : : ' +par);
        return par;
    }

    @AuraEnabled(cacheable=True)
    public static List<Account> getPartners(string partnerTypeId)
    {
        if(string.isEmpty(partnerTypeId)){
            return[select Id,Name,Partner_Type_Lookup__c,Partner_Type_Lookup__r.Name,Partner_Budget__c,Partner_Total_Sales_Revenue__c,Partner_Active_Pipeline_Value__c,
            Partner_Primary_POC__c,Partner_Primary_POC__r.Name,Partner_Primary_POC__r.title,Partner_Primary_POC__r.salutation,Partner_Primary_POC__r.Image__c,Partner_Contract_End_Date__c,Partner_Contract_Start_Date__c,Partner_Status__c,
            Partner_Training_Completed__c,Number_of_Trained_Partner_Contacts__c,Partner_Website__c,Partner_Geo_Location__Latitude__s,Partner_Geo_Location__Longitude__s,Partner_Geo_Location__c,
            (select FirstName,LastName,title,salutation from Contacts) from Account where Partner_Status__c IN ('Active' , 'InActive', 'Pending')];
        }else {
            return[select Id,Name,Partner_Type_Lookup__c,Partner_Type_Lookup__r.Name,Partner_Budget__c,Partner_Total_Sales_Revenue__c,Partner_Active_Pipeline_Value__c,
            Partner_Primary_POC__c,Partner_Primary_POC__r.Name,Partner_Primary_POC__r.title,Partner_Primary_POC__r.salutation,Partner_Primary_POC__r.Image__c ,Partner_Contract_End_Date__c,Partner_Contract_Start_Date__c,Partner_Status__c,
            Partner_Training_Completed__c,Number_of_Trained_Partner_Contacts__c,Partner_Website__c,Partner_Geo_Location__Latitude__s,Partner_Geo_Location__Longitude__s,Partner_Geo_Location__c,
            (select FirstName,LastName,title,salutation from Contacts) from Account where Partner_Status__c IN ('Active' , 'InActive', 'Pending') AND Partner_Type_Lookup__c =: partnerTypeId];
        }
    }

    @AuraEnabled(cacheable=True)
    public static List<Partner_Performance_Review__c> getPartnerReviews(string partnerAccountId)
    {
        try{
           return[SELECT Id, Name, CreatedById,CreatedBy.Name, CreatedBy.email, Overall_Feedback__c, Overall_Rating__c, 
           Partner_Implementation_Description__c, Partner_Quality__c, Partner_Business_Planning__c, 
        Partner_Account__c FROM Partner_Performance_Review__c Where partner_Account__c =: partnerAccountId];

        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}
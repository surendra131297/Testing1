public class Assessmentyear {
    
    @AuraEnabled(cacheable=true)
    
    public static List<Assesment_Year__c> yearsList(){
        
        return [Select Id,Name from Assesment_Year__c ];
    }
    
     @AuraEnabled
    public static string createAssessmentRecords(Sale1_Assessment__c assessmentRecords) {
        string msg;
        system.debug(assessmentRecords.Assesment_Year__c);
        try {
            insert assessmentRecords;
            msg = 'Success';
        } catch (Exception e) {
             msg = e.getMessage();
            throw new AuraHandledException('Error creating Assessment Records: ' + e.getMessage());
        }
        return msg;
    }
    
     @AuraEnabled
    public static string createTechAssessmentRecords(Technical_Assessment__c assessmentRecords) {
        string msg;
        system.debug(assessmentRecords.Assesment_Year__c);
        try {
            insert assessmentRecords;
            msg = 'Success';
        } catch (Exception e) {
             msg = e.getMessage();
            throw new AuraHandledException('Error creating Assessment Records: ' + e.getMessage());
        }
        return msg;
    }
    
     @AuraEnabled
    public static string createMarketingAssessmentRecords(Marketing_Assesment__c assessmentRecords) {
        string msg;
        system.debug(assessmentRecords.Assesment_Year__c);
        try {
            insert assessmentRecords;
            msg = 'Success';
        } catch (Exception e) {
             msg = e.getMessage();
            throw new AuraHandledException('Error creating Assessment Records: ' + e.getMessage());
        }
        return msg;
    }

}
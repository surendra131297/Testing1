public class CaseSurvey {
    
    @AuraEnabled(cacheable=true)
    
    public static String saveSurvey(String lastName, String lastName1, String lastName2, String lastName3,String lastName4,String casenum,String feedbac,String ratevalue ) {
        
        Case_Survey__c survey = new Case_Survey__c();
        survey.RepresentativeCommunicate__c = lastName;
        survey.ServiceRating__c = lastName1;
        survey.RepresentativeNature__c = lastName2;
        survey.RepresentativeUnderstanding__c = lastName3;
        survey.OutcomeSatisfaction__c = lastName4;
        survey.Case_Number__c = casenum;
        survey.AdditionalComments__c = feedbac;
        survey.Overall_Rating__c = ratevalue;
       // survey.Status__c = 'Closed';
        
        
        
        /*            survey.Wissinfo__Overall_Rating__c = lastName5;
survey.Wissinfo__AdditionalComments__c = feedbac;
survey.Wissinfo__Case_Number__c = casenum;   */
        //survey.Wissinfo__Case__c=cs.Id;
        
        
        system.debug('cn...'+casenum);
        try{
            insert survey; 
            return 'success';
        }
        catch(exception e){
            return 'fail';
        }
        
    }
    
    
    @AuraEnabled(cacheable=true)

    public static Boolean checkRecordExists(String cn){

        system.debug('cn....'+cn);
			Boolean recordExists = false;

        List<Case_Survey__c> surveys = [select id,Case_Number__c,Case__c from Case_Survey__c WHERE Case_Number__c =: cn ];

        try {

            if (surveys.size()==0) {

               recordExists = true;

            }
            else{

                recordExists = false;

            }

        } catch (Exception e) {

            System.debug('Error querying Case Survey object: ' + e.getMessage());

        }

        system.debug('Case Found...'+recordExists);

        return recordExists;

    }
    
    
    @AuraEnabled(cacheable=true)
    public static list<	Case_Survey__c> casesurvey()
    {
        list<Case_Survey__c> cs =new list<Case_Survey__c>();
        cs = [select id,AdditionalComments__c, Case__c, Case_Number__c, RepresentativeCommunicate__c, Overall_Rating__c, 
              Primary_Feedback__c, ServiceRating__c, RepresentativeNature__c, RepresentativeUnderstanding__c, 
              OutcomeSatisfaction__c FROM Case_Survey__c];
        return cs;
    }
}
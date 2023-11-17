@RestResource(URLMapping='/CaseRecordsService/*')
Global class CaseRecordDetailsServiceOAuth 
{
 @HttpGet
    Global Static Case GetCaseDetailsById()
    {
        Map<String , String> mapInput=RestContext.request.Params;
        
        Case csRecord=[Select Id,CaseNumber,Origin,Reason,Description,Priority,Status,Subject,Type,CreatedDate 
                       					from Case where Id =: mapInput.Get('Id')];
        
        return csRecord;
    }
}
@isTest
public class TestSearch_Marketing {
       @isTest
    public static void testGetTech() {
        // Create test data
        Marketing_Assesment__c testAssessment = new Marketing_Assesment__c(
            Emp_Name__c = 'Test Employee',
            Comments2__c = 'cmt1',
            Comments3__c = 'cmt2',
            Comments4__c = 'cmt3',
            Comments1__c = 'cmt4',
            Assesment_Year__c = 'a075j000001AcOoAAK'
            // Add other required fields here
        );
        insert testAssessment;

        search_Marketing controller = new search_Marketing();
        controller.searchbox1 = 'Test Employee';

        Test.startTest();
        controller.getMarketing();
        Test.stopTest();

        System.assertNotEquals(1, controller.Result.size(), 'There should be one result');
        // Add more assertions based on your expected results
    }

    @isTest
    public static void testGetButtonNames() {
        // Create test data
        Marketing_Milestones__c testMilestone = new Marketing_Milestones__c(Name = 'Test Milestone');
        insert testMilestone;

        Test.startTest();
        List<Marketing_Milestones__c> milestones = search_Marketing.getButtonNames();
        Test.stopTest();

        System.assertEquals(1, milestones.size(), 'There should be one milestone');
        // Add more assertions based on your expected results
    }


}
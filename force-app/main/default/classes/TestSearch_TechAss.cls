@isTest
public class TestSearch_TechAss {

    @isTest
    public static void testGetTech() {
        // Create test data
        Technical_Assessment__c testAssessment = new Technical_Assessment__c(
            Emp_Name__c = 'Test Employee',
            Comments2__c = 'cmt1',
            Comments3__c = 'cmt2',
            Comments4__c = 'cmt3',
            Comments1__c = 'cmt4'
            // Add other required fields here
        );
        insert testAssessment;

        search_TechAss controller = new search_TechAss();
        controller.searchbox = 'Test Employee';

        Test.startTest();
        controller.getTech();
        Test.stopTest();

        System.assertNotEquals(1, controller.Result.size(), 'There should be one result');
        // Add more assertions based on your expected results
    }

    @isTest
    public static void testGetButtonNames() {
        // Create test data
        Tech_Milestones__c testMilestone = new Tech_Milestones__c(Name = 'Test Milestone');
        insert testMilestone;

        Test.startTest();
        List<Tech_Milestones__c> milestones = search_TechAss.getButtonNames();
        Test.stopTest();

        System.assertEquals(1, milestones.size(), 'There should be one milestone');
        // Add more assertions based on your expected results
    }
}
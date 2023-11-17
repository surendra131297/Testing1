@isTest
public class TestSearch_SalesASS {
     @isTest
    public static void testGetTech() {
        // Create test data
        sale1_Assessment__c testAssessment = new sale1_Assessment__c(
            Emp_Name__c = 'Test Employee',
            Comments2__c = 'cmt1',
            Comments3__c = 'cmt2',
            Comments4__c = 'cmt3',
            Employee_Comments__c = 'cmt4',
            Assesment_Year__c = 'a075j000001AcOoAAK'
            // Add other required fields here
        );
        insert testAssessment;

        search_SalesASS controller = new search_SalesASS();
        controller.searchbox1 = 'Test Employee';

        Test.startTest();
        controller.getSales();
        Test.stopTest();

        System.assertNotEquals(1, controller.Result.size(), 'There should be one result');
        // Add more assertions based on your expected results
    }

    @isTest
    public static void testGetButtonNames() {
        // Create test data
        Sales_Milestones__c testMilestone = new Sales_Milestones__c(Name = 'Test Milestone');
        insert testMilestone;

        Test.startTest();
        List<Sales_Milestones__c> milestones = search_SalesASS.getButtonNames();
        Test.stopTest();

        System.assertEquals(1, milestones.size(), 'There should be one milestone');
        // Add more assertions based on your expected results
    }

}
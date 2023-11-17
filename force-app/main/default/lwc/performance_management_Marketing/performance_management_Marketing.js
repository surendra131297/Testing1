import { LightningElement , wire,api, track} from 'lwc';
//import getButtonNames from '@salesforce/apex/search_TechAss.getButtonNames';
//import salesmilestones from '@salesforce/apex/search_SalesASS.getButtonNames';
import Marketingmilestones from '@salesforce/apex/search_Marketing.getButtonNames';
import { CurrentPageReference } from 'lightning/navigation';
import getAssessmentYears from '@salesforce/apex/Assessmentyear.yearsList';
import createAssessmentRecords from '@salesforce/apex/Assessmentyear.createMarketingAssessmentRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { createRecord } from 'lightning/uiRecordApi';
export default class Performance_management_Marketing extends LightningElement {


    @api recordId;
buttonNames =[];
salesButtonNames=[];
marketButtonNames=[];
CurrentPageReference;
selectedMilestone;
    rating = [0,0,0,0];
    comments = ["","","",""];
    showForm = false;
    milestoneData = [];
    selectedAssessmentYearId;

 @wire(CurrentPageReference)
    setCurrentPageReference(reference) {
        this.currentPageReference = reference;
    }

 
 @wire(Marketingmilestones)
    wiredButtonNames({ error, data }) {
        if (data) {
            this.buttonNames = data;
            console.log('Tech Button Names: ' + JSON.stringify(this.buttonNames));
        } else if (error) {
            console.log('Error fetching button names: ' + error);
        }
    }

 

    @wire(CurrentPageReference)
    currentPageReference;

    // Method to check the user's profile
   checkUserMarketProfile() {
        const profile = this.currentPageReference && this.currentPageReference.attributes && this.currentPageReference.attributes.profileName;
        return profile === 'Marketing Employee Profile';
    }

  // Method to populate Assessment Year options dynamically
    @wire(getAssessmentYears)
    wiredAssessmentYears({ error, data }) {
        if (data) {
            // Map the retrieved data to the options format
            this.assessmentYearOptions = data.map(year => ({
                label: year.Name, // Replace with the field name holding the year value
                value: year.Id // Replace with the field name holding the year's unique identifier
            }));
        } else if (error) {
            console.log('Error fetching Assessment Years: ' + error);
        }
    }
  ratingPicklistValues = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        // Add more options as needed
    ];
    //r-avimodhfoe

    @track milest = []
    @track milestValues = []
    showInp = false;
    clikCount = 0;

    handleButtonClick(event) {
        const buttonLabel = event.target.label;
        this.milestValues.push(event.target.value)
        console.log('this.milestValues.....'+this.milestValues)
        this.selectedMilestone = buttonLabel;
        this.showForm = true;

        this.clikCount = this.clikCount + 1;
        const obj = {Id:"milestone"+this.clikCount, value: this.selectedMilestone}
        
        if(this.milest.length<4){
            this.milest.push(obj);
            this.showInp = true;
            console.log(this.milest)
        }
    }
    
    // addInp(){
    //     this.clikCount = this.clikCount + 1;
    //     this.milest.push("milestone"+this.clikCount);
    //     this.showInp = true;
    //     console.log(this.milest)
    // }

    handleRatingChange(event) {
        event.target.name == "milestone1" ? this.rating[0] = event.target.value : null,
        event.target.name == "milestone2" ? this.rating[1] = event.target.value : null,
        event.target.name == "milestone3" ? this.rating[2] = event.target.value : null,
        event.target.name == "milestone4" ? this.rating[3] = event.target.value : null
    }

    handleCommentsChange(event) {
        event.target.name == "milestone1" ? this.comments[0] = event.target.value : null,
        event.target.name == "milestone2" ? this.comments[1] = event.target.value : null,
        event.target.name == "milestone3" ? this.comments[2] = event.target.value : null,
        event.target.name == "milestone4" ? this.comments[3] = event.target.value : null

        console.log(JSON.stringify(event.target.name)+'     '+JSON.stringify(this.comments[0]))
    }
     handleAssessmentYearChange(event) {
        this.selectedAssessmentYearId = event.target.value;
    }

    // submitAssessment() {
    //     this.milest.push({
    //         MilestoneName: this.selectedMilestone,
    //         Rating: this.rating,
    //         Comments: this.comments
    //     });

        // this.selectedMilestone = '';
        // this.rating = '';
        // this.comments = '';
        // this.showForm = false;
   // }

 submitAssessment() {
       if (this.milest.length === 4 && this.selectedAssessmentYearId) {
            try {
                // Prepare data for creating Assessment records
                const assessmentRecords = [];
                    const assessmentRecord = {
                        sobjectType: 'Marketing_Assesment__c',
                        Milestone1__c: this.milestValues[0],
                        Milestone2__c: this.milestValues[1],
                        Milestone3__c: this.milestValues[2],
                        Milestone4__c: this.milestValues[3],
                        Rating1__c: this.rating[0],
                        Rating2__c: this.rating[1],
                        Rating3__c: this.rating[2],
                        Rating4__c: this.rating[3],
                        Comments1__c: this.comments[0],
                        Comments2__c: this.comments[1],
                        Comments3__c: this.comments[2],
                        Comments4__c: this.comments[3],
                        Assesment_Year__c: this.selectedAssessmentYearId,
                    };
                    console.log('assessment years  ' +this.selectedAssessmentYearId);

                // Call the Apex method to insert records
                createAssessmentRecords({ assessmentRecords : assessmentRecord })
                    .then((result) => {
                        if (result == 'Success') {
                            // Records inserted successfully
                            this.milest = [];
                            // Show a success message
                            const evt = new ShowToastEvent({
                                title: 'Success',
                                message: 'Assessment Records created successfully.',
                                variant: 'success',
                            });
                            this.dispatchEvent(evt);
                        }
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.error('Error creating Assessment Records:', error);
                        // Show an error message
                        const evt = new ShowToastEvent({
                            title: 'Error',
                            message: 'Please select all Rating ,Comment while creating Assessment Records.',
                            variant: 'error',
                        });
                        this.dispatchEvent(evt);
                    });
            } catch (error) {
                console.log('Error creating Assessment Records:', error);
            }
        } else {
            // Display an error message if milestones or Assessment Year is missing
            const evt = new ShowToastEvent({
                title: 'Error',
                message: 'Please select all milestone and an Assessment Year.',
                variant: 'error',
            });
            this.dispatchEvent(evt);
        }
    }

}
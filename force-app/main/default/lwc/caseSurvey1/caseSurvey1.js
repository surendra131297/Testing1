import { LightningElement, track, wire, api } from 'lwc';

import saveContact from '@salesforce/apex/CaseSurvey.saveSurvey'

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import checkRecordExists from '@salesforce/apex/CaseSurvey.checkRecordExists'

//import caseSurveyCheck from '@salesforce/apex/caseserreq.caseSurveyCheck';

import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

export default class SurverCaseForm1 extends LightningElement {
    errorMessage;

    caseNumber;

    show = true;

    submitted = false;




    @wire(CurrentPageReference)

    setCurrentPageReference(currentPageReference) {

        this.caseNumber = currentPageReference.state.caseNumber;

        //console.log(' caseNumber => ', this.caseNumber);

        // this.connectedCallback();

        //this.checkIfRecordExists();

    }




    connectedCallback() {

        //console.log('CaseNumberFor....', this.caseNumber);

        checkRecordExists({ cn: this.caseNumber })

            .then(result => {

                if (result == true) {

                    // If a record exists, display an error message and disable the submit button

                    //console.log('CaseNumberFor1111111', this.caseNumber);

                    this.errorMessage = 'A record for this case number already exists.';

                    this.show = true;

                    //console.log('Found case NUmber', result);

                    //}

                } else {

                    // If a record does not exist, enable the submit button

                    this.errorMessage = 'No Recordsss';

                    this.show = false;

                    //console.log('No Records');

                    //console.log('CaseNumberFor2222222', result);

                }

            })

            .catch(error => {

                //console.log('error Details', error);

            });

    }





    // connectedCallback() {

    //     console.log('res123'+this.caseNumber);

    //     caseSurveyCheck({CN : '00001027'})

    //     .then(result => {

    //         console.log('res',result);

    //         if(result==='success'){

    //         this.show = true;

    //         }

    //     })

    //     .catch(error => {

    //         console.log('catch',error);

    //         this.error = error;

    //     });

    // }





    @track value;

    @track value1;

    @track value2;

    @track value3;

    @track value4;

   

    orderid = '';

    rating1;

    feedback;






    OutcomeSatisfaction__c = [

        { label: 'Very satisfied', value: 'Very satisfied' },

        { label: 'Somewhat satisfied', value: 'Somewhat satisfied' },

        { label: 'Neutral', value: 'Neutral' },

        { label: 'Somewhat dissatisfied', value: 'Somewhat dissatisfied' },

        { label: 'Very dissatisfied', value: 'Very dissatisfied' }

    ];




    RepresentativeCommunicate__c = [

        { label: 'Yes, always', value: 'Yes, always' },

        { label: 'Yes, sometimes', value: 'Yes, sometimes' },

        { label: 'No, not really', value: 'No, not really' },

        { label: 'Not sure', value: 'Not sure' },

    ];




    RepresentativeNature__c = [

        { label: 'Very friendly and helpful', value: 'Very friendly and helpful' },

        { label: 'Somewhat friendly and helpful  ', value: 'Somewhat friendly and helpful' },

        { label: 'Neutral', value: 'Neutral' },

        { label: 'Somewhat unfriendly and unhelpful', value: 'Somewhat unfriendly and unhelpful' },

        { label: 'Very unfriendly and unhelpful', value: 'Very unfriendly and unhelpful' }

    ];





     RepresentativeUnderstanding__c = [

         { label: 'Yes, completely', value: 'Yes, completely' },

        { label: 'Yes, partially', value: 'Yes, partially' },

       { label: 'No, not at all', value: 'No, not at all' },

         { label: 'Not sure', value: 'Not sure' }

     ];




     ServiceRating__c = [

         { label: 'Excellent', value: 'Excellent' },

         { label: 'Good', value: 'Good' },

         { label: 'Fair', value: 'Fair' },

         { label: 'Poor', value: 'Poor' }

     ];





    handleChange(event) {

        this.value = event.detail.value;

    }

    handleChange1(event) {

        this.value1 = event.detail.value;

    }

    handleChange2(event) {

        this.value2 = event.detail.value;

    }
    handleChange3(event) {

        this.value3 = event.detail.value;

    }

    handleChange4(event) {

        this.value4 = event.detail.value;

    }
    handleChange5(event) {

        this.feedback = event.detail.value;

    }
   

   

    handleChange6(event) {

        this.caseNumber = event.target.value;

    }

    rating(event) {

        this.rating1 = event.target.value;

    }

   




    handleSubmit() {

         console.log('this.value,', this.value);

         console.log('this.value2,', this.value2);

         console.log('this.value1,', this.value1);
         console.log('this.value1,', this.value3);
         console.log('this.value1,', this.value4);
         console.log('this.value1,', this.value5);

         console.log('this.value6', this.value6);





        saveContact({

            lastName: this.value, lastName1: this.value1, lastName2: this.value2, lastName3: this.value3, lastName4: this.value4, casenum: this.caseNumber, ratevalue : this.rating1,

            feedbac: this.feedback

        })

            .then(response => {

                console.log(response);

                if (response == 'success') {

                    this.submitted = true;

                   

                }

                //    alert ('submited',response );

                    console.log('Submited successfully');

                const event = new ShowToastEvent({

                    title: 'Toast message',

                    message: 'Thank You for your valuable feedback',

                    variant: 'success',

                    mode: 'dismissable'

                });

                this.dispatchEvent(event);




            })

            .catch(error => {

                console.log('error...'+error);

                alert('error', error);

                const event = new ShowToastEvent({

                    title: 'Required Details',

                    message: 'Please Enter the Correct/required details',

                    variant: 'Error',

                    mode: 'dismissable'

                }); console.error('error', error);

                this.dispatchEvent(event);




            });

        this.value




    }
}
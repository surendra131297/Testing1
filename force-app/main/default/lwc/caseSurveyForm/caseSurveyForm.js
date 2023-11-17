import { LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import SURVEY_OBJECT from '@salesforce/schema/Case_Survey__c';
import REPRESENTATIVE_COMM_FIELD from '@salesforce/schema/Case_Survey__c.RepresentativeCommunicate__c';
import REC_FIELD from '@salesforce/schema/Case_Survey__c.ServiceRating__c';
//import caseNumber from '@salesforce/schema/Case_Survey__c.Case_Number__c';
import REPRESENTATIVE_NATURE_FIELD from '@salesforce/schema/Case_Survey__c.RepresentativeNature__c';
import PROD_FIELD from '@salesforce/schema/Case_Survey__c.RepresentativeUnderstanding__c';
import OUTCOME_SATISFACTION_FIELD from '@salesforce/schema/Case_Survey__c.OutcomeSatisfaction__c';
/* import SURVEY_OBJECT from '@salesforce/schema/Case_Survey__c';
import REPRESENTATIVE_COMM_FIELD from '@salesforce/schema/Case_Survey__c.RepresentativeCommunicate__c';
import REC_FIELD from '@salesforce/schema/Case_Survey__c.ServiceRating__c';
import REPRESENTATIVE_NATURE_FIELD from '@salesforce/schema/Case_Survey__c.RepresentativeNature__c';
import PROD_FIELD from '@salesforce/schema/Case_Survey__c.RepresentativeUnderstanding__c';
import OUTCOME_SATISFACTION_FIELD from '@salesforce/schema/Case_Survey__c.OutcomeSatisfaction__c'; */
//import RATING_FIELD from '@salesforce/schema/Case_Survey__c.Rating__c';

//import feedback_FIELD from '@salesforce/schema/Case_Survey__c.Feedback__c';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {currentPageReference , NavigationMixin } from 'lightning/navigation';

export default class CaseSurveyForm extends NavigationMixin(LightningElement) {
    @track value;
    @track value1;
    @track value2;
    @track value3;
    @track value4;
    orderid='';
    caseNumber;
    feedback;
    options =[];
    options1=[];
    options2=[];
    options3=[];
    options4=[];

    @wire(getObjectInfo, { objectApiName: SURVEY_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: REPRESENTATIVE_COMM_FIELD})
    TypePicklistValues({data,error})
    {
         if(data)
         {
             let ratingvalue=[];
            for(let i=0; i<data.values.length; i++) {
                ratingvalue.push({
                    label: data.values[i].label,
                    value: data.values[i].value
                })
                  


            }
            this.options=ratingvalue;
                  console.log('options', this.options);

         }else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }


    }

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: REC_FIELD})
    IndustryPicklistValues({data,error}){
        if(data)
         {
             let ratingvalue=[];
            for(let i=0; i<data.values.length; i++) {
                ratingvalue.push({
                    label: data.values[i].label,
                    value: data.values[i].value
                })
                  


            }
            this.options1=ratingvalue;
                  console.log('options', this.options1);

         }else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }


    }


    
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: REPRESENTATIVE_NATURE_FIELD})
    FindPicklistValues({data,error}){
        if(data)
         {
             let ratingvalue=[];
            for(let i=0; i<data.values.length; i++) {
                ratingvalue.push({
                    label: data.values[i].label,
                    value: data.values[i].value
                })
                  


            }
            this.options2=ratingvalue;
                  console.log('options', this.options2);

         }else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }


    }

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: PROD_FIELD})
    ProdPicklistValues({data,error}){
        if(data)
         {
             let ratingvalue=[];
            for(let i=0; i<data.values.length; i++) {
                ratingvalue.push({
                    label: data.values[i].label,
                    value: data.values[i].value
                })
                  


            }
            this.options3=ratingvalue;
                  console.log('options', this.options3);

         }else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }


    }



    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: OUTCOME_SATISFACTION_FIELD})
    ServPicklistValues({data,error}){
        if(data)
         {
             let ratingvalue=[];
            for(let i=0; i<data.values.length; i++) {
                ratingvalue.push({
                    label: data.values[i].label,
                    value: data.values[i].value
                })
                  


            }
            this.options4=ratingvalue;
                  console.log('options', this.options4);

         }else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }


    }
    @wire(currentPageReference)

    setCurrentPageReference(currentPageReference) {

        this.caseNumber = currentPageReference.state.caseNumber;

        //console.log(' caseNumber => ', this.caseNumber);

        // this.connectedCallback();

        //this.checkIfRecordExists();

    } 


    


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
    handleChange5(event){
        this.feedback=event.target.value;
    }
    handleChange6(event) {

        this.caseNumber = event.target.value;

    }

 /*  @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.orderid = currentPageReference.state.n__CaseId;
        console.log(' Cart Id => ', this.orderid);
    }  */
    handleSubmit(){

        var fields = {

            RepresentativeCommunicate__c:this.value,
            ServiceRating__c:this.value1,
            RepresentativeNature__c:this.value2,
            RepresentativeUnderstanding__c:this.value3,
            OutcomeSatisfaction__c:this.value4,
            AdditionalComments__c:this.feedback,
            Overall_Rating__c:this.packagerating,
            Case_Number__c:this.caseNumber	


        }
        var objRecordInput = {'apiName' : 'Case_Survey__c', fields};
        createRecord(objRecordInput).then(response => {
          const event = new ShowToastEvent({
            title: 'Toast message',
            message: 'Thank You for your valuable feedback',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
       
        })
        .catch(error => {
          const event = new ShowToastEvent({
            title: 'Required Details',
            message: 'Please Enter the details',
            variant: 'Error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
      });


    }

 


    packagerating;

  rating(event) {
    if (event.target.name === "Overall_Rating__c") {
      this.packagerating = event.target.value;
    }
  }
    
}
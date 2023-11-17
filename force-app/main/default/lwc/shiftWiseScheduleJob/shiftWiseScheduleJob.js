import { LightningElement } from 'lwc';
//import jobMethod from '@salesforce/apex/shiftWiseCaseChangeJobScheduler.jobMethod';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShiftWiseScheduleJob extends LightningElement {
    
    handleClick() {
        jobMethod()
            .then(() => {
                console.log('success');
               
        const evt = new ShowToastEvent({
            title: "Success",
            message: "Scheduled Successfully",
            variant: "success",
            mode: "sticky"
        });
        this.dispatchEvent(evt);
    
            })
            .catch((error) => {
                console.error(error);
    
        const evt = new ShowToastEvent({
            title: "Sorry",
            message: "Job Already Scheduled ",
            variant: "error",
            mode: "sticky"
        });
        this.dispatchEvent(evt);
    
            });
    }
}
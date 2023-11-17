import { LightningElement,track } from 'lwc';
export default class Checkboxes_component extends LightningElement
{
    @track display = false;
    @track display1 = false;
    @track display3 = false;
   
    displayHandler(event)
    {
        this.display = event.target.checked;
       
    }
    displayHandler1(event)
    {
        this.display1 = event.target.checked;
    }
    displayHandler2(event)
    {
        this.display3 = event.target.checked;
    }
}
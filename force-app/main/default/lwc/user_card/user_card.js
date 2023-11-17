import { LightningElement } from 'lwc';
export default class User_card extends LightningElement {
     imageData;

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imageData = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

}
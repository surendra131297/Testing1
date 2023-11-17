import { LightningElement ,api ,wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi'

//import LEAFLET from staticresource
//import LEAFLET from '@salesforce/resourceUrl/leaflet';
//import { loadScript, loadStyle} from 'lightning/platformResourceLoader';

export default class PartnerContactLocation extends LightningElement {

    //public property to recieve partner account id from parent component(partnel detail)
    @api partnerAccountId;

    mapMarkers;
    zoomLevel;
    listView;

    //property to hold location coordinates
    latitude;
    longitude;
    BCity;
    BCountry;
    BState;
    BPinCode;
    BStreet;
    leafletmap;

    //get lat & long values from DB using getRecord  
    @wire(getRecord,{recordId : '$partnerAccountId',fields:['Account.Partner_Geo_Location__Latitude__s','Account.Partner_Geo_Location__Longitude__s',
                                                             'Account.BillingCity','Account.BillingCountry','Account.BillingState','Account.BillingPostalCode','Account.BillingStreet']})
    processOutput({data,error})
    {
        if(data)
        {
            //console.log('city.....'+data.fields.BillingCity.value)
            //Read the values from the field and assign to the local properties
            this.latitude = data.fields.Partner_Geo_Location__Latitude__s.value;
            this.longitude = data.fields.Partner_Geo_Location__Longitude__s.value;
            this.BCity = data.fields.BillingCity.value;
            this.BCountry = data.fields.BillingCountry.value;
            this.BPinCode = data.fields.BillingPostalCode.value;
            this.BStreet = data.fields.BillingStreet.value;
            this.BState = data.fields.BillingState.value;
            this.fireMe();
        }
        else if(error)
        {
            console.log('Error' + error.body.message);
        }
    }
    fireMe(){
       // let location = {}
    console.log('city.....'+this.BCity)
    this.mapMarkers = [
        {
            location: { 
                City: this.BCity,
                Country : this.BCountry,
                PostalCode : this.BPinCode,
                State : this.BState,
                Street : this.BStreet
             /*   Latitude: this.latitude,
                Longitude: this.longitude,  */
            },
        },
    ];
    this.zoomLevel = 20;
    this.listView = 'visible';
}


    /*
    connectedCallback()
    {
        Promise.all([loadScript(this,LEAFLET + '/leaflet.js'), loadStyle(this, LEAFLET + '/leaflet.css')])
        .then(()=> { this.plotMap();})
    }
    plotMap()
    {
        //find the div where we wanted to plot the map
        const map = this.template.querySelector('.map');
        if(map)
        {
            this.leafletmap = L.map(map,{zoomControl : true }).setView([51.505, -0.09],13);
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/service/World_Street_Map/MapServer/tile/{z}/{y}/{x}' , {attribution : 'contact Location'}).addTo(map);
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');

        }
        const location = [this.latitude, this.longitude];

        const leafletMarker = L.marker(location).addTo(map);
        leafletMarker.addTo(this.leafletmap);
        this.leafletmap.setView(location);

        console.log('mmmmmmmmmmmaaaaaaaaaaappppppppp');
    }*/

}
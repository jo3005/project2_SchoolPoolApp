const googlefns=require("./googlefns");
const gmaps=require("./gmaps");
const geodata=require("./geodata");    

let origin=[{
    number: "24",
    streetname: "Le Souef Drive",
    suburb: "Kardinya",
    postcode: "6163",
    state:"WA",
    country: "Australia",
    gps:null
    },
    {
    number: "66",
    streetname: "Jackson Avenue",
    suburb: "Winthrop",
    postcode: "6160",
    state:"WA",
    country: "Australia",
    gps:"-32.053309,115.831192"
    }];
    

   
let destination= [{
    number: null,
    streetname: "McCabe Street",
    suburb: "Mosmon Park",
    postcode: "6012",
    state:"WA",
    country: "Australia",
    gps:"-32.022123,115.773325" 
}];




let distances= gmaps(origin,destination)
    .then(response=>{
        console.log(response);
        return response
});

let gps=geodata(origin[0])
    .then(response =>{
        console.log(response);
        return response;
})

    
        


const getalldistances=require("./getalldistances");
const geodata=require("./geodata");    

let places=[
    {
        number: "24",
        streetname: "Le Souef Drive",
        suburb: "Kardinya",
        postcode: "6163",
        state:"WA",
        country: "Australia",
        gps:"-32.066027,115.811441"
        },
    {
        number: "66",
        streetname: "Jackson Avenue",
        suburb: "Winthrop",
        postcode: "6160",
        state:"WA",
        country: "Australia",
        gps: "-32.053309,115.831192"
        },
    {
        number: "61",
        streetname: "Owston Street,",
        suburb: "Mosman Park",
        postcode: "6012",
        state:"WA",
        country: "Australia",
        gps: "-32.020717, 115.773808"
        }    

]
let totalExtraTime=0;
let totalExtraDistance=0;
let notice=getalldistances(places,"now")
    .then(res=>{
        //console.log(res)
        totalExtraTime=  res[1].duration+res[2].duration - res[0].duration;

        totalExtraDistance=  res[1].distance+res[2].distance - res[0].distance;

    }).then(res=>{
        let textToWrite=`This pickup will cost you an extra ${Math.round(totalExtraTime)} minutes of travel time and will add ${totalExtraDistance}km to your journey.`
        console.log(textToWrite)
        return (textToWrite);
        
    });


/* let gps=geodata(origin[0])
    .then(response =>{
        console.log(response);
        return response;
}) */


    const gmaps=require("./gmaps");
    

    let origin={
        number: "24",
        streetname: "Le Souef Drive",
        suburb: "Kardinya",
        postcode: "6163",
        state:"WA",
        country: "Australia",
        gps:null
    };

    let destination= {
        number: "66",
        streetname: "Jackson Avenue",
        suburb: "Winthrop",
        postcode: "6160",
        state:"WA",
        country: "Australia",
        gps:"-32.053309, 115.831192"
    };

    
    let answer= gmaps(origin,destination,"now").then(response=>{
        console.log(response);
        return response
    });
        
    //$("#return").html(answer);


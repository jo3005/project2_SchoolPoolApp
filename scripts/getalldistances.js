const gmaps=require("./gmaps");
module.exports = async function (places,whatTime="now"){
    let promise= new Promise((resolve,reject) => {
    //expects an array of addresses where the first element is the origin address and the last element is the destination address
    //currently limited to one additional location

        let distArray=[];
        let numberPlaces=places.length;  // this is so we can include more stops later
    
        gmaps(places[0],places[2],"0")  //this is the driver's original route
        .then(response=>{
            distArray.push(response);
            //console.log(distArray);
            return distArray
        }).then(res=>{
            gmaps(places[0],places[1],"1")  //origin to first stop
            .then(response=>{
                distArray.push(response);
                return distArray;
            }).then(res=>{
                gmaps(places[1],places[2],"2")
                .then(response=>{
                    distArray.push(response);
                    //console.log(distArray);
                    resolve (distArray);
                    });
                });

        }); 
    
    });
    let result= await promise;
    return result;     
};
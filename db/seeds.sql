insert into members (memUsername, memFirstname,memLastname,memEmail,credits,memMobile,password) values ('jblack1974', 'John', 'Black', 'jblack@hotmail.com',12,'0061 432 158 394','tempyboy#45');
insert into members (memUsername, memFirstname,memLastname,memEmail,credits,memMobile,password) values ('fblack_06', 'Fiona', 'Black', 'fblack06@hotmail.com',34,'0061 435 206 111','wondergirl99');
insert into members (memUsername, memFirstname,memLastname,memEmail,credits,memMobile,password) values ('katblack_48', 'Katrina', 'Black', 'katblack48@hotmail.com',4,'0061 418 658 111','supergran*2');
insert into members (memUsername, memFirstname,memLastname,memEmail,credits,memMobile,password) values ('julie_anders8', 'Julie', 'Anders', 'julieanders8@gmail.com',12,'0061 418 528 001','primapwd');

insert into drivers (licenceNumber, stateOfIssue, expiryDate,yearsDriving,workingWithChildren,memId) values (3713856,1,'2025-06-24',15,1,1);
insert into drivers (licenceNumber, stateOfIssue, expiryDate,yearsDriving,workingWithChildren,memId) values (3568718,2,'2024-09-01',18,1,2);
insert into drivers (licenceNumber, stateOfIssue, expiryDate,yearsDriving,workingWithChildren,memId) values (4628912,1,'2021-12-01',24,1,4);

insert into vehicles (registration,make,model,color,spareSpots,spareChildSeats,spareBoosters,petsEverTravel,driverID) values ('1DVL938','Hyundai','ix35','grey',3,1,1,0,1);
insert into vehicles (registration,make,model,color,spareSpots,spareChildSeats,spareBoosters,petsEverTravel,driverID) values ('1DVL938','Hyundai','ix35','grey',3,1,1,0,2);
insert into vehicles (registration,make,model,color,spareSpots,spareChildSeats,spareBoosters,petsEverTravel,driverID) values ('1DVL938','Hyundai','ix35','grey',3,1,1,0,3);

insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('Black house','17','Le Souef Drive','Kardinya','6163','WA','Australia','-32.066027,115.811441',1);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('St Hilda''s Childley Campus',null,'McCabe Street','Mosmon Park','6012','WA','Australia','-32.022123,115.773325',1);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('Christchurch GS',null,'Queenslea Drive','Claremont','6010','WA','Australia','-31.986847,115.778429',1);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('Black house','17','Le Souef Drive','Kardinya','6163','WA','Australia','-32.066027,115.811441',2);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('St Hilda''s Childley Campus',null,'McCabe Street','Mosmon Park','6012','WA','Australia','-32.022123,115.773325',2);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('Christchurch GS',null,'Queenslea Drive','Claremont','6010','WA','Australia','-31.986847,115.778429',2);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('Black house','17','Le Souef Drive','Kardinya','6163','WA','Australia','-32.066027,115.811441',3);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('St Hilda''s Childley Campus',null,'McCabe Street','Mosmon Park','6012','WA','Australia','-32.022123,115.773325',3);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('Christchurch GS',null,'Queenslea Drive','Claremont','6010','WA','Australia','-31.986847,115.778429',3);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('Anders Home','25A','Elvira Street','Palmyra','6157','WA','Australia','-32.039796,115.780780',4);
insert into locations (locationName,streetNumber,streetName,suburb,postcode,state,country,locGps,memId) values ('St Hilda''s Childley Campus',null,'McCabe Street','Mosmon Park','6012','WA','Australia','-32.022123,115.773325',4);

insert into parents (memId,relationship) values (1,"Father");
insert into parents (memId,relationship) values (2,"Mother");
insert into parents (memId,relationship) values (3,"Grandmother - paternal");
insert into parents (memId,relationship) values (4,"Mother");

insert into passengers (passFirstname,passLastname,isChild,passGender,havePetAllergies,whatAllergy,haveFoodAllergies,bigEquipmentCarried,meetingPointConsidered,passMobile,passDob,passRequiredChildSeatType,requiresEscortToClass,parentId) 
values ('Jessica','Black',1,'Female',0,null,0,0,0,'0412456789','2009-06-06',0,0,2);
insert into passengers (passFirstname,passLastname,isChild,passGender,havePetAllergies,whatAllergy,haveFoodAllergies,bigEquipmentCarried,meetingPointConsidered,passMobile,passDob,passRequiredChildSeatType,requiresEscortToClass,parentId) 
values ('Timothy','Black',1,'Male',0,null,0,0,0,'0412456880','2009-06-06',0,0,2);
insert into passengers (passFirstname,passLastname,isChild,passGender,havePetAllergies,whatAllergy,haveFoodAllergies,bigEquipmentCarried,meetingPointConsidered,passMobile,passDob,passRequiredChildSeatType,requiresEscortToClass,parentId) 
values ('Mia','Anders',1,'Female',0,null,0,0,0,null,'2009-04-01',0,0,4);

insert into passengers (passFirstname,passLastname,isChild,passGender,havePetAllergies,whatAllergy,haveFoodAllergies,bigEquipmentCarried,meetingPointConsidered,passMobile,passDob,passRequiredChildSeatType,requiresEscortToClass,parentId) 
values ('Jessica','Black',1,'Female',0,null,0,0,0,'0412456789','2009-06-06',0,0,1);
insert into passengers (passFirstname,passLastname,isChild,passGender,havePetAllergies,whatAllergy,haveFoodAllergies,bigEquipmentCarried,meetingPointConsidered,passMobile,passDob,passRequiredChildSeatType,requiresEscortToClass,parentId) 
values ('Timothy','Black',1,'Male',0,null,0,0,0,'0412456880','2009-06-06',0,0,1);
insert into passengers (passFirstname,passLastname,isChild,passGender,havePetAllergies,whatAllergy,haveFoodAllergies,bigEquipmentCarried,meetingPointConsidered,passMobile,passDob,passRequiredChildSeatType,requiresEscortToClass,parentId) 
values ('Jessica','Black',1,'Female',0,null,0,0,0,'0412456789','2009-06-06',0,0,3);
insert into passengers (passFirstname,passLastname,isChild,passGender,havePetAllergies,whatAllergy,haveFoodAllergies,bigEquipmentCarried,meetingPointConsidered,passMobile,passDob,passRequiredChildSeatType,requiresEscortToClass,parentId) 
values ('Timothy','Black',1,'Male',0,null,0,0,0,'0412456880','2009-06-06',0,0,3);

insert into routes (routeName,startLocnId,endLocnId,routeDistance,routeTotalTime,routeStartTime,driverId) values ("Girls morning school run",1,2,13.8,17,null,1);
insert into routes (routeName,startLocnId,endLocnId,routeDistance,routeTotalTime,routeStartTime,driverId) values ("Tim's morning school run", 1,3,16.1,19,null,1);
insert into routes (routeName,startLocnId,endLocnId,routeDistance,routeTotalTime,routeStartTime,driverId) values ("Jessicas morning school run",1,2,13.8,17,null,2);
insert into routes (routeName,startLocnId,endLocnId,routeDistance,routeTotalTime,routeStartTime,driverId) values ("Tim's morning school run", 1,3,16.1,19,null,2);
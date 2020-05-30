insert into childseattype (description) values ('none');
insert into childseattype (description) values ('childseat');
insert into childseattype (description) values ('booster');

insert into relationships (relationship) values ('Mother');
insert into relationships (relationship) values ('Father');
insert into relationships (relationship) values ('Step-Mother');
insert into relationships (relationship) values ('Step-Father');
insert into relationships (relationship) values ('Grandmother - maternal');
insert into relationships (relationship) values ('Grandmother - paternal');
insert into relationships (relationship) values ('Grandfather - maternal');
insert into relationships (relationship) values ('Grandfather - paternal');
insert into relationships (relationship) values ('Older Sibling');
insert into relationships (relationship) values ('Nanny');
insert into relationships (relationship) values ('Other');

insert into australiastates (stateAbbr,stateName) values ('WA','Western Australia');
insert into australiastates (stateAbbr,stateName) values ('SA','South Australia');
insert into australiastates (stateAbbr,stateName) values ('NT','Northern Territory');
insert into australiastates (stateAbbr,stateName) values ('QLD','Queensland');
insert into australiastates (stateAbbr,stateName) values ('NSW','New South Wales');
insert into australiastates (stateAbbr,stateName) values ('VIC','Victoria');
insert into australiastates (stateAbbr,stateName) values ('TAS','Tasmania');
insert into australiastates (stateAbbr,stateName) values ('ACT','Australian Capital Territory');


insert into members (mem_username, memFirstname,memLastname,memEmail,credits,memMobile)
values ('jblack1974', 'John', 'Black', 'jblack@hotmail.com',12,'0061 432 158 394','tempyboy#45');
insert into members (mem_username, memFirstname,memLastname,memEmail,credits,memMobile,memPwd)
values ('fblack_06', 'Fiona', 'Black', 'fblack06@hotmail.com',34,'0061 435 206 111','wondergirl99');
insert into members (mem_username, memFirstname,memLastname,memEmail,credits,memMobile,memPwd)
values ('katblack_48', 'Katrina', 'Black', 'katblack48@hotmail.com',4,'0061 418 658 111','supergran*2');
insert into members (mem_username, memFirstname,memLastname,memEmail,credits,memMobile,memPwd)
values ('julie_anders8', 'Julie', 'Anders', 'julieanders8@gmail.com',12,'0061 418 528 001','primapwd');

insert into parents (memId,relationshipType) values (1,2);
insert into parents (memId,relationshipType) values (1,1);
insert into parents (memId,relationshipType) values (1,6);
insert into parents (memId,relationshipType) values (1,1);

insert into drivers (licenceNumber, stateOfIssue, expiryDate,yearsDriving,workingWithChildrenCheck,memId) 
values (3713856,1,'2025-06-24',15,1,1);
insert into drivers (licenceNumber, stateOfIssue, expiryDate,yearsDriving,workingWithChildrenCheck,memId) 
values (3568718,2,'2024-09-01',18,1,2);
insert into drivers (licenceNumber, stateOfIssue, expiryDate,yearsDriving,workingWithChildrenCheck,memId) 
values (4628912,1,'2021-12-01',24,1,4);

insert into locations (locationName,streetNumber,unitNumber,streetName,suburb,postcode,gpsCoords)
values ('Black house','17',null,'Le Souef Drive','Kardinya','6163','-32.066027, 115.811441');
insert into locations (locationName,streetNumber,unitNumber,streetName,suburb,postcode,gpsCoords)
values ('St Hilda''s Childley Campus',null,null,'McCabe Street','Mosmon Park','6012','--32.022123, 115.773325');
insert into locations (locationName,streetNumber,unitNumber,streetName,suburb,postcode,gpsCoords)
values ('Christchurch GS',null,null,'Queenslea Drive','Claremont','6010','-31.986847, 115.778429');
insert into locations (locationName,streetNumber,unitNumber,streetName,suburb,postcode,gpsCoords)
values ('Anders Home',25,'A','Elvira Street','Palmyra','6157','-32.039796, 115.780780');


insert into passengers (passFirstname,passLastname,passGender,havePetAllergies,haveFoodAllergies,defaultPickupId,defaultDestinationId,bigEquipmentCarried,meetingPointConsidered)
values ('Jessica','Black','Female',0,0,1,2,0,0);
insert into passengersminors (passId,passDob,passRequiredChildseatType,passRequiresEscortToClass) 
values (1,'2009-06-06',0,0);

insert into passengers (passFirstname,passLastname,passGender,havePetAllergies,haveFoodAllergies,defaultPickupId,defaultDestinationId,bigEquipmentCarried,meetingPointConsidered)
values ('Timothy','Black','Male',0,0,1,3,0,0);
insert into passengersminors (passId,passDob,passRequiredChildseatType,passRequiresEscortToClass) 
values (2,'2009-06-06',0,0);

insert into passengers (passFirstname,passLastname,passGender,havePetAllergies,haveFoodAllergies,defaultPickupId,defaultDestinationId,bigEquipmentCarried,meetingPointConsidered)
values ('Mia','Anders','Female',0,0,1,2,0,0);
insert into passengersminors (passId,passDob,passRequiredChildseatType,passRequiresEscortToClass) 
values (3,'2009-04-01',0,0);

insert into passtoparentmap (parentId,passMinId) values (1,1);
insert into passtoparentmap (parentId,passMinId) values (1,2);
insert into passtoparentmap (parentId,passMinId) values (2,1);
insert into passtoparentmap (parentId,passMinId) values (2,2);
insert into passtoparentmap (parentId,passMinId) values (3,1);
insert into passtoparentmap (parentId,passMinId) values (3,2);
insert into passtoparentmap (parentId,passMinId) values (3,3);

insert into driverstoparentmap (parentId,driverId) values (1,1);
insert into driverstoparentmap (parentId,driverId) values (2,2);
insert into driverstoparentmap (parentId,driverId) values (3,3);

insert into vehicles (registration,make,model,color,spareSpots,spareChildSeats,spareBoosterSeats,doPetsEverTravel)
values ('1DVL938','Hyundai','ix35','grey',3,1,1,0);
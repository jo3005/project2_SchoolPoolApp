create schema schoolpool;
use schoolpool;

CREATE TABLE `members` (
  `memId` int NOT NULL AUTO_INCREMENT,
  `mem_username` varchar(45) NOT NULL,
  `memFirstname` varchar(45) DEFAULT NULL,
  `memLastname` varchar(45) DEFAULT NULL,
  `memEmail` varchar(45) NOT NULL,
  `credits` int DEFAULT '0',
  `memMobile` varchar(16) NOT NULL DEFAULT '0061 000 000 000',
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`memId`)
) ;

CREATE TABLE `schoolpool`.`passengers` (
  `passId` INT NOT NULL AUTO_INCREMENT,
  `passFirstname` VARCHAR(45) NOT NULL,
  `passLastname` VARCHAR(45) NOT NULL,
  `isChild` TINYINT NOT NULL DEFAULT 1,
  `passGender` VARCHAR(45) NULL,
  `havePetAllergies` TINYINT NULL DEFAULT 0,
  `haveFoodAllergies` TINYINT NULL DEFAULT 0,
  `whatAllergy` VARCHAR(255) NULL,
  `defaultPickupId` INT NULL,
  `defaultDestinationId` INT NULL,
  `bigEquipmentCarried` TINYINT NULL DEFAULT 0,
  `meetingPointConsidered` TINYINT NULL,
  `passMobile` VARCHAR(16) NULL,
  PRIMARY KEY (`passId`));

CREATE TABLE `schoolpool`.`passengersminors` (
  `passMinId` INT NOT NULL AUTO_INCREMENT,
  `passId` INT NOT NULL,
  `passDob` DATETIME NULL,
  `passRequiredChildseatType` INT NULL DEFAULT 0 COMMENT '0=none\n1=childseat\n2=booster seat',
  `passRequiresEscortToClass` TINYINT NULL DEFAULT 0 COMMENT '0=no, 1=yes',
  PRIMARY KEY (`passMinId`));
  
CREATE VIEW `schoolpool`.`v_passengers` AS
    SELECT 
        `schoolpool`.`passengers`.`passId` AS `passId`,
        `schoolpool`.`passengers`.`passFirstname` AS `passFirstname`,
        `schoolpool`.`passengers`.`passLastname` AS `passLastname`,
        `schoolpool`.`passengers`.`isChild` AS `isChild`,
        `schoolpool`.`passengers`.`passGender` AS `passGender`,
        `schoolpool`.`passengers`.`havePetAllergies` AS `havePetAllergies`,
        `schoolpool`.`passengers`.`haveFoodAllergies` AS `haveFoodAllergies`,
        `schoolpool`.`passengers`.`whatAllergy` AS `whatAllergy`,
        `schoolpool`.`passengers`.`defaultPickupId` AS `defaultPickupId`,
        `schoolpool`.`passengers`.`defaultDestinationId` AS `defaultDestinationId`,
        `schoolpool`.`passengers`.`bigEquipmentCarried` AS `bigEquipmentCarried`,
        `schoolpool`.`passengers`.`meetingPointConsidered` AS `meetingPointConsidered`,
        `schoolpool`.`passengers`.`passMobile` AS `passMobile`,
        `schoolpool`.`passengersminors`.`passMinId` AS `passMinId`,
        `schoolpool`.`passengersminors`.`passDob` AS `passDob`,
        `schoolpool`.`passengersminors`.`passRequiredChildseatType` AS `passRequiredChildseatType`,
        `schoolpool`.`passengersminors`.`passRequiresEscortToClass` AS `passRequiresEscortToClass`
    FROM
        (`schoolpool`.`passengers`
        LEFT JOIN `schoolpool`.`passengersminors` ON ((`schoolpool`.`passengers`.`passId` = `schoolpool`.`passengersminors`.`passId`)));
        
    
CREATE TABLE `childseattype` (
  `childseattypeId` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`childseattypeId`)
) ; 
  
CREATE TABLE `schoolpool`.`relationships` (
  `relId` INT NOT NULL AUTO_INCREMENT,
  `relationship` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`relId`));
  
  CREATE TABLE `schoolpool`.`parents` (
  `parentId` INT NOT NULL AUTO_INCREMENT,
  `memId` INT NOT NULL,
  `relationshipType` INT NULL,
  PRIMARY KEY (`parentId`),
  INDEX `FK_memID_idx` (`memId` ASC) VISIBLE,
  INDEX `FK_relationship_idx` (`relationshipType` ASC) VISIBLE,
  CONSTRAINT `FK_memID`
    FOREIGN KEY (`memId`)
    REFERENCES `schoolpool`.`members` (`memId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_relationship`
    FOREIGN KEY (`relationshipType`)
    REFERENCES `schoolpool`.`relationships` (`relId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Parents or Guardians of passengers that are minors';

CREATE TABLE `schoolpool`.`passtoparentmap` (
  `ptpmapId` INT NOT NULL AUTO_INCREMENT,
  `parentId` INT NULL,
  `passMinId` INT NULL,
  PRIMARY KEY (`ptpmapId`),
  INDEX `FK_parentId_idx` (`parentId` ASC) VISIBLE,
  INDEX `FK_passMinId_idx` (`passMinId` ASC) VISIBLE,
  CONSTRAINT `FK_parentId`
    FOREIGN KEY (`parentId`)
    REFERENCES `schoolpool`.`parents` (`parentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_passMinId`
    FOREIGN KEY (`passMinId`)
    REFERENCES `schoolpool`.`passengersminors` (`passMinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Maps which children (passengersminors) have which parents';

CREATE TABLE `australiastates` (
  `idStates` int NOT NULL AUTO_INCREMENT,
  `stateAbbr` varchar(3) DEFAULT NULL,
  `stateName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idStates`)
);

CREATE TABLE `drivers` (
  `driverId` int NOT NULL AUTO_INCREMENT,
  `licenceNumber` varchar(10) NOT NULL,
  `stateOfIssue` int DEFAULT '1',
  `expiryDate` datetime DEFAULT NULL,
  `yearsDriving` int DEFAULT NULL,
  `workingWithChildrenCheck` tinyint DEFAULT NULL,
  `defaultRouteId` int DEFAULT NULL,
  `memId` int DEFAULT NULL,
  PRIMARY KEY (`driverId`),
  KEY `FK_state_idx` (`stateOfIssue`),
  KEY `FK_memberId_idx` (`memId`),
  CONSTRAINT `FK_memberId` FOREIGN KEY (`memId`) REFERENCES `members` (`memId`),
  CONSTRAINT `FK_state` FOREIGN KEY (`stateOfIssue`) REFERENCES `australiastates` (`idStates`)
) ;
    
CREATE TABLE `schoolpool`.`vehicles` (
  `vehicleId` INT NOT NULL AUTO_INCREMENT,
  `registration` VARCHAR(45) NOT NULL,
  `make` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NULL,
  `spareSpots` INT NOT NULL DEFAULT 1,
  `spareChildSeats` INT NULL DEFAULT 0,
  `spareBoosterSeats` INT NULL DEFAULT 0,
  `doPetsEverTravel` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`vehicleId`));
  
  
  CREATE TABLE `schoolpool`.`driverstoparentmap` (
  `dtpmapId` INT NOT NULL AUTO_INCREMENT,
  `parentId` INT NULL,
  `driverId` INT NULL,
  PRIMARY KEY (`dtpmapId`),
  INDEX `FK_parent_idx` (`parentId` ASC) VISIBLE,
  INDEX `FK_driver_idx` (`driverId` ASC) VISIBLE,
  CONSTRAINT `FK_parent`
    FOREIGN KEY (`parentId`)
    REFERENCES `schoolpool`.`parents` (`parentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_driver`
    FOREIGN KEY (`driverId`)
    REFERENCES `schoolpool`.`drivers` (`driverId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE `locations` (
  `locId` int NOT NULL AUTO_INCREMENT,
  `locationName` varchar(255) DEFAULT NULL,
  `streetNumber` varchar(5) DEFAULT NULL,
  `unitNumber` varchar(5) DEFAULT NULL,
  `streetName` varchar(45) DEFAULT NULL,
  `suburb` varchar(45) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `gpsCoords` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`locId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci 
COMMENT='Addresses of homes, collection or delivery locations';

CREATE TABLE `schoolpool`.`schools` (
  `schoolId` INT NOT NULL AUTO_INCREMENT,
  `schoolName` VARCHAR(45) NOT NULL,
  `campusName` VARCHAR(45) NULL,
  `streetNumber` VARCHAR(45) NULL,
  `streetName` VARCHAR(45) NULL,
  `suburb` VARCHAR(45) NULL,
  `openTime` DATETIME NULL,
  `startTime` DATETIME NOT NULL,
  `finishTime` DATETIME NOT NULL,
  `closeTime` DATETIME NULL,
  `phone` VARCHAR(16) NULL,
  PRIMARY KEY (`schoolId`));
  
ALTER TABLE `schoolpool`.`passengers` 
ADD INDEX `FK_defaultPickup_idx` (`defaultPickupId` ASC) VISIBLE,
ADD INDEX `FK_defaultDropoff_idx` (`defaultDestinationId` ASC) VISIBLE;
;
ALTER TABLE `schoolpool`.`passengers` 
ADD CONSTRAINT `FK_defaultPickup`
  FOREIGN KEY (`defaultPickupId`)
  REFERENCES `schoolpool`.`locations` (`locId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_defaultDropoff`
  FOREIGN KEY (`defaultDestinationId`)
  REFERENCES `schoolpool`.`locations` (`locId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


CREATE TABLE `schoolpool`.`routes` (
  `routesId` INT NOT NULL AUTO_INCREMENT,
  `startLocnId` INT NULL,
  `endLocnId` INT NULL,
  `routeDistance` DECIMAL(10,2) NULL,
  `routeTotalTime` DECIMAL(10,2) NULL,
  `routeStartTimeForEstimate` DATETIME NULL,
  PRIMARY KEY (`routesId`),
  INDEX `FK_startId_idx` (`startLocnId` ASC) VISIBLE,
  INDEX `FK_endId_idx` (`endLocnId` ASC) VISIBLE,
  CONSTRAINT `FK_startId`
    FOREIGN KEY (`startLocnId`)
    REFERENCES `schoolpool`.`locations` (`locId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_endId`
    FOREIGN KEY (`endLocnId`)
    REFERENCES `schoolpool`.`locations` (`locId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
  
ALTER TABLE `schoolpool`.`drivers` 
ADD INDEX `FK_route_idx` (`defaultRouteId` ASC) VISIBLE;


ALTER TABLE `schoolpool`.`drivers` 
ADD CONSTRAINT `FK_route`
  FOREIGN KEY (`defaultRouteId`)
  REFERENCES `schoolpool`.`routes` (`routesId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `schoolpool`.`requests` (
  `reqId` INT NOT NULL AUTO_INCREMENT,
  `memId` INT NULL,
  `reqDate` DATETIME NULL,
  `pickupLocnId` INT NULL,
  `dropoffLocnId` INT NULL,
  `travelDate` DATETIME NULL,
  `startTimeWindow` DATETIME NULL,
  `endTimeWindow` DATETIME NULL,
  `creditsOffered` INT NULL,
  `numBoosters` INT NULL DEFAULT 0,
  `numCarSeats` INT NULL DEFAULT 0,
  `addedTimeEstimate` INT NULL,
  `addedDistEstimate` DECIMAL NULL,
  PRIMARY KEY (`reqId`),
  INDEX `FK_pickup_idx` (`pickupLocnId` ASC) VISIBLE,
  INDEX `FK_dropoff_idx` (`dropoffLocnId` ASC) VISIBLE,
  CONSTRAINT `FK_pickup`
    FOREIGN KEY (`pickupLocnId`)
    REFERENCES `schoolpool`.`locations` (`locId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_dropoff`
    FOREIGN KEY (`dropoffLocnId`)
    REFERENCES `schoolpool`.`locations` (`locId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `schoolpool`.`requestpassengers` (
  `reqPassId` INT NOT NULL AUTO_INCREMENT,
  `reqId` INT NULL,
  `passId` INT NULL,
  PRIMARY KEY (`reqPassId`),
  INDEX `FK_requestId_idx` (`reqId` ASC) VISIBLE,
  INDEX `FK_passId_idx` (`passId` ASC) VISIBLE,
  CONSTRAINT `FK_requestId`
    FOREIGN KEY (`reqId`)
    REFERENCES `schoolpool`.`requests` (`reqId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_passId`
    FOREIGN KEY (`passId`)
    REFERENCES `schoolpool`.`passengers` (`passId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Passengers associated with a particular request';

CREATE TABLE `schoolpool`.`rides` (
  `rideId` INT NOT NULL AUTO_INCREMENT,
  `vehicleId` INT NULL,
  `driverId` INT NULL,
  `baseRouteId` INT NULL,
  PRIMARY KEY (`rideId`),
  INDEX `FK_vehicle_idx` (`vehicleId` ASC) VISIBLE,
  INDEX `FK_driver_idx` (`driverId` ASC) VISIBLE,
  INDEX `FK_baseRouteId_idx` (`baseRouteId` ASC) VISIBLE,
  CONSTRAINT `FK_vehicle`
    FOREIGN KEY (`vehicleId`)
    REFERENCES `schoolpool`.`vehicles` (`vehicleId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_driver1`
    FOREIGN KEY (`driverId`)
    REFERENCES `schoolpool`.`drivers` (`driverId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_baseRouteId`
    FOREIGN KEY (`baseRouteId`)
    REFERENCES `schoolpool`.`routes` (`routesId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `schoolpool`.`riderequests` (
  `rrId` INT NOT NULL AUTO_INCREMENT,
  `rideId` INT NULL,
  `reqId` INT NULL,
  PRIMARY KEY (`rrId`),
  INDEX `FK_rideId_idx` (`rideId` ASC) VISIBLE,
  INDEX `FK_reqId_idx` (`reqId` ASC) VISIBLE,
  CONSTRAINT `FK_rideId`
    FOREIGN KEY (`rideId`)
    REFERENCES `schoolpool`.`rides` (`rideId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_reqId`
    FOREIGN KEY (`reqId`)
    REFERENCES `schoolpool`.`requests` (`reqId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Requests that were added to a ride';
    
CREATE TABLE `schoolpool`.`driverstovehiclesmap` (
  `dtvmapId` INT NOT NULL AUTO_INCREMENT,
  `vehicleId` INT NULL,
  `drivId` INT NULL,
PRIMARY KEY (`dtvmapId`));

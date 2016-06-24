function getMetadata(data, model_clicked) {
// create array of attributes from just the model clicked
    console.log("in getMetadata");
    one_model_metadata = [];   //reset array for each model clicked on
 
    for (j=0; j < data.length; j++){
          //alert(data[j].modelType);
          if (data[j].modelShortName == model_clicked){
               //Overview
               var overview = new Array();
               overview[0] = data[j].modelShortName
               overview[1] = data[j].modelLongName
               overview[2] = data[j].modelType
               overview[3] = data[j].organization
               overview[4] = data[j].gridResolution
               overview[5] = data[j].coupledFamilies

               //code access
               var access = new Array();
               access[0] = data[j].codeAccessDescription1
               access[1] = data[j].codeAccessUrl1
               access[2] = data[j].codeAccessUrlTitle1
               access[3] = data[j].codeAccessDescription2
               access[4] = data[j].codeAccessUrl2
               access[5] = data[j].codeAccessUrlTitle2


               // general documentation
               var general = new Array();
               general[0] = data[j].generalUrl1
               general[1] = data[j].generalUrlTitle1
               general[2] = data[j].generalUrl2
               general[3] = data[j].generalUrlTitle2
               general[4] = data[j].generalUrl3
               general[5] = data[j].generalUrlTitle3


               // scientific documentation

               var science = new Array();
               science[0] = data[j].scienceUrl1
               science[1] = data[j].scienceUrlTitle1
               science[2] = data[j].scienceUrl2
               science[3] = data[j].scienceUrlTitle2
               science[4] = data[j].scienceUrl3
               science[5] = data[j].scienceUrlTitle3

               var technical = new Array();
               technical[0] = data[j].technicalUrl1
               technical[1] = data[j].technicalUrlTitle1
               technical[2] = data[j].technicalUrl2
               technical[3] = data[j].technicalUrlTitle2
               technical[4] = data[j].technicalUrl3
               technical[5] = data[j].techaicalUrlTitle3

               //Compliance Logs
               var compliance = new Array();
               compliance[0] = data[j].complianceLogLink1
               compliance[1] = data[j].complianceLogLinkTitle1
               compliance[2] = data[j].complianceLogLink2
               compliance[3] = data[j].complianceLogLinkTitle2
               compliance[4] = data[j].complianceLogLink3
               compliance[5] = data[j].complianceLogLinkTitle3

               //Test Reports
               var test_reports = new Array();
               test_reports[0] = data[j].testReportLink1
               test_reports[1] = data[j].testReportLinkTitle1
               test_reports[2] = data[j].testReportLink2
               test_reports[3] = data[j].testReportLinkTitle2
               test_reports[4] = data[j].testReportLink3
               test_reports[5] = data[j].testReportLinkTitle3

               var cap = new Array();
               cap[0] = data[j].nuopcCapUrl
               cap[1] = data[j].nuopcCapTitle

               //nuopc[4] = data[j].nuopcCapLocation

               // extract information for one model for tabbed metadata display
               one_model_metadata[0] = overview;
               one_model_metadata[1] = general;
               one_model_metadata[2] = science;
               one_model_metadata[3] = technical;
               one_model_metadata[4] = technical;
               one_model_metadata[5] = compliance;
               one_model_metadata[6] = test_reports;
               one_model_metadata[7] = access;
               one_model_metadata[8] = cap;
          }
     }
}

function getMetadataByType(data) {
       // get the metadata to fill in the master table of models by type
       console.log("in getMetadataByType");
       console.log("     number of rows in data: " + data.length);
       types = ["Ocean", "Atmosphere", "Ice", "Wave", "Coupled", "Hydrological", "Land", "Space"];
       console.log(data[0]);

       console.log("types.length is  " + types.length);
       console.log("data.length is  " + data.length);
       
       for (i = 0; i < types.length; i++) {
           console.log("     in type loop, type is: " + types[i]);
           var typesummary= [];  //new array
           k = 0;
           for (j=0; j < data.length; j++){
                console.log("     model type is " + data[j].modelType);
                if (data[j].modelType == types[i]){
                     console.log("    in data loop, short name is " + data[j].modelShortName);    
                     var summary = new Array();
                     summary[0] = data[j].modelShortName
                     summary[1] = data[j].gridResolution
                     summary[2] = data[j].codeAccessDescription1
                     summary[3] = data[j].codeAccessUrl1
                     summary[4] = data[j].codeAccessUrlTitle1
                     summary[5] = data[j].codeAccessDescription2
                     summary[6] = data[j].codeAccessUrl2
                     summary[7] = data[j].codeAccessUrlTitle2
                     summary[8] = data[j].coupledFamilies
                     typesummary[k] = summary;
                     k++;
                } //end if
            } //j loop 

            console.log("     done with looping through data, typesummary is: " + typesummary);
            metadata_bytype[types[i]] = typesummary;
        } //i loop
          
        console.log("     metadata_bytype keys are " + Object.keys(metadata_bytype));
        console.log("     ocean key returns " + metadata_bytype["Ocean"]);
        return metadata_bytype
}


// deprecated
function getAllByType(requested_type){
       // get list of models by model type
     var j = 0;
     for (i = 0; i < metadata.length; i++) {
 
          if  (data[i].modelType == requested_type) {
              subset[0] = metadata[i].modelShortname;
              subset[1] = metadata[i].organization;
              subset[2] = metadata[i].version;
              subset_collection[j] = subset;
              j++
          }
     }
}


function listModels(event, type) {
// creates the master table
       console.log("in listModels");
       console.log("    input type into table is " + type);
       //deleteTable("master", "master_table");

       var headings = new Array();
       headings[0] = "Model Name"
       headings[1] = "Grid Resolution(s)"
       headings[2] = "NUOPC Version Access and Terms of Use"
       headings[3] = "Associated Coupled Model(s)"
  
       console.log("    metadata selected by type is for this table is " + metadata_bytype[type]);
       var attributes = metadata_bytype[type].sort();  //sort alphabetically by shortname
       if (attributes == null){
            console.log ("there is no models with model type " + type);
            alert(" There are no " + type + " models in the sytem.");
            return;
       }
       var container = document.getElementById("type_holder");
       table = createMasterTable(headings,attributes);
       //alert("container created");
       container.appendChild(table);
       //alert("here");
       return false;
}




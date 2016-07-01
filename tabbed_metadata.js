var tab_selected_color = "#B9E0E3";
var header_color = "#666";


// fills in the tabbed display of metadata for one model
function listMetadata(name){
      console.log("in listMetadata");
      if (name != null) {
           document.getElementById("metadata_holder").style.display = "block";
           document.getElementById("type_holder").style.display = "none";
           console.log("    model to display is " + name);
           getMetadata(master_data, name);  // extract the metadata for that model
           openOverview();
      }
      return false;
}

function openOverview() {
        console.log("in openOverview");
        hideEverything();
        clearTabs("tablinks");
        document.getElementById("overview").style.backgroundColor = tab_selected_color;
        document.getElementById("overview").style.color= header_color;
         
        var container = document.getElementById("Overview");

        var headings = new Array();
        headings[0] = "Name"
        headings[1] = "Long Name"
        headings[2] = "Type"
        headings[3] = "Organization"
        headings[4] = "Grid Resolution"
        headings[5] = "Associated Coupled Models"

        var attributes = one_model_metadata[0];  //global var
        console.log('       metadata to display on the overview tab is ' + attributes);

        var table_exists = document.getElementById("overview_table");

        if (table_exists != null){
              console.log(' does the table exist? ' + table_exists);
              //debugger;
              deleteTable("Overview","overview_table");
        }
        table = createTable("overview_table",headings,attributes);
        container.appendChild(table);
        document.getElementById("Overview").style.display = "block";
        document.getElementById("back_links_holder").style.display = "block";
 
        // add name of model above tabbed display
        container2 = document.getElementById("name_holder");
        container2.style.display = "block";
        h3 = document.createElement('H3');
        h3.style.textAlign="center";
        h3.style.color = header_color;
        h3.style.fontSize = "14pt";
        h3.appendChild(document.createTextNode(attributes[0]));
        h3.appendChild(document.createTextNode(" Model Metadata"));
        container2.appendChild(h3);
        
        return false;
}

function openAccess(){
         console.log ("in openAccess");
         hideEverything();
         clearTabs("tablinks");
         document.getElementById("access").style.backgroundColor = tab_selected_color;
         document.getElementById("access").style.color= header_color;
         container = document.getElementById("Access"); 
         var access = skipEmptyLinks(one_model_metadata[7]);
         console.log("      access metadata is " + access);

         // create special access table. this one is different from all the rest so it is coded here.
         var table = document.createElement('TABLE');
         var tableBody = document.createElement('TBODY');
         table.className = w3_classes;
         table.id = "access_table";

          var table_exists = document.getElementById("access_table");
          if  (table_exists == null) {
              // loop over rows
              for (i = 0; i < access.length; i += 3) {
                   var tr = document.createElement('TR');
                   var td = document.createElement('TD');
                   var text = access[i] + " ";
                   td.appendChild(document.createTextNode(text));
                   // some cases have only text and no links
                   if (typeof(access[i+1]) != "undefined"){
                       console.log ("     i+1 " + access[i+1]);
                       console.log ("     i+2 " + access[i+2]);
                       td.appendChild(document.createTextNode("See link: "));
                       a = createLink(access[i+1],access[i+2]);
                       td.appendChild(a);
                   }
                   console.log(td);
                   tr.appendChild(td);
                   tableBody.appendChild(tr);
               }

               table.appendChild(tableBody);
               container.appendChild(table);
        }
        document.getElementById("Access").style.display = "block";
        return false;
}


// NUOPC Version Documentation and Terms of Use
function openNUOPC(){
       console.log("in openNUOPC");
       hideEverything();
       clearTabs("tablinks");
       document.getElementById("nuopc").style.backgroundColor = tab_selected_color;
       document.getElementById("nuopc").style.color = header_color;  
       var container = document.getElementById("NUOPC");


       var headings = [ ] ;
       headings[0] = "Test Report(s)"
       headings[1] = "Compliance Logs(s)"
       headings[2] = "NUOPC Cap"

       var compliance = skipEmptyLinks(one_model_metadata[5]);
       var test_reports = skipEmptyLinks(one_model_metadata[6]);
       var cap = skipEmptyLinks(one_model_metadata[8]); //access is 7

       var compliance_links = [ ];
       var test_report_links = [ ];
       var cap_links = [ ];

       // loop through complance links and put into an array
       k=0;
       for (i = 0; i < compliance.length; i += 2){
              if (i == 20 ){
                 alert("runaway loop");
                 return false;
              }
              a = createLink(compliance[i],compliance[i+1]);
              console.log(i + "      compliance link is " + a);
              compliance_links[k]  = a;
               k++;
        }

        // loop through test report links and put into an array
        k=0;
        for (i = 0; i < test_reports.length; i += 2){
              if (i == 20 ){
                 alert("runaway loop");
                 return false;
              }
              a = createLink(test_reports[i],test_reports[i+1]);
              console.log("      test report link is " + a);
              test_report_links[k] = a;
              k++;
        }

        // loop through cap links and put into an array (should be only one at the moment)
        k=0;
        for (i = 0; i < cap.length; i += 2){
              if (i == 20 ){
                 alert("runaway loop");
                 return false;
              }
              a = createLink(cap[i], cap[i+1]);
              console.log("      cap link is " + a);
              cap_links[k] = a;
              k++;
        }



        var table_exists = document.getElementById("nuopc_table");

        if (table_exists != null){
              console.log(' does the table exist? ' + table_exists);
              deleteTable("NUOPC","nuopc_table");
        }

        attributes = [];
        attributes[0] = test_report_links;
        console.log(" test report links " + attributes[0]);
        attributes[1] = compliance_links;
        console.log(" compliance links " + attributes[1]);
        attributes[2] = cap_links;
        console.log(" cap links " + attributes[2]);

        table = createLinksTable("nuopc_table", headings, attributes);
        container.appendChild(table);

        document.getElementById("NUOPC").style.display = "block";  
        return false;
}


// Component Documentation 
function openComponentDocumentation(){
       console.log("in openComponentDocumentation");
       hideEverything();
       clearTabs("tablinks");
       document.getElementById("component").style.backgroundColor = tab_selected_color;
       document.getElementById("component").style.color = header_color;  
       var container = document.getElementById("Component");


       var headings = [ ] ;
       headings[0] = "General"
       headings[1] = "Scientific"
       headings[2] = "Technical"
       headings[3] = "User"

       var general_docs = skipEmptyLinks(one_model_metadata[1]);
       console.log(general_docs);
       var science_docs = skipEmptyLinks(one_model_metadata[2]);
       console.log(science_docs);
       var technical_docs = skipEmptyLinks(one_model_metadata[3]);
       console.log(technical_docs);
       var user_docs = skipEmptyLinks(one_model_metadata[4]);
       console.log(user_docs);

       var general_links = [ ];
       var science_links = [ ];
       var technical_links = [ ];
       var user_links = [ ];

       k=0;
       for (i = 0; i < general_docs.length; i += 2){
              a = createLink(general_docs[i], general_docs[i+1]);
              console.log(i + "      general docs  link is " + a);
              general_links[k]  = a;
               k++;
        }
        k=0;

        for (i = 0; i < science_docs.length; i += 2){
              a = createLink(science_docs[i],science_docs[i+1]);
              console.log("      science docs link is  " + a);
              science_links[k] = a;
              k++;
        }

       k=0;
       for (i = 0; i < technical_docs.length; i += 2){
              a = createLink(technical_docs[i],technical_docs[i+1]);
              console.log("      technical link is  " + a);
              technical_links[k] = a;
              k++;
        }

       k=0;
       for (i = 0; i < user_docs.length; i += 2){
              a = createLink(user_docs[i],user_docs[i+1]);
              console.log("      user link is  " + a);
              user_links[k] = a;
              k++;
        }

        var table_exists = document.getElementById("component_table");

        if (table_exists != null){
              console.log(' does the table exist? ' + table_exists);
              deleteTable("Component","component_table");
        }

        attributes = [];
        attributes[0] = general_links;
           console.log(" general links " + attributes[0]);
        attributes[1] = science_links;
           console.log(" science " + attributes[1]);
        attributes[2] = technical_links;
           console.log(" technical " + attributes[2]);
        attributes[3] = user_links;
           console.log(" user " + attributes[3]);

        table = createLinksTable("component_table", headings, attributes);
        container.appendChild(table);

        document.getElementById("Component").style.display = "block";  
        return false;
}

function openDocumentationOLD(){
    hideEverything();
    clearTabs("tablinks");
    document.getElementById("docs").style.backgroundColor = tab_selected_color;
    document.getElementById("docs").style.color= header_color;
    var container = document.getElementById("Documentation");

     var titles = new Array();
     titles[0] = "CIM Documentation"
     titles[1] = "General Overview"
     titles[2] = "Scientific Documentation"
     titles[3] = "Technical Documentation"
     titles[4] = "User's Guide"

     var attributes = one_model_metadata[1];
     var table_exists = document.getElementById("doc_table");
     if  (table_exists == null) {
          table = createSimpleTable("doc_table",titles,attributes);
          container.appendChild(table);
     }

    document.getElementById("Documentation").style.display = "block";  
    return false;
}


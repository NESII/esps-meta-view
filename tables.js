var first_column_width = "250px";
var w3_classes = " w3-table w3-white w3-striped w3-border";
var header_color = "#666";


function createLinksTable(id, headings,attributes) {
         console.log("in createLinksTable");

         var table = document.createElement('TABLE');
         var tableBody = document.createElement('TBODY');

         table.className = w3_classes;
         table.id = id;

        for (i = 0; i < headings.length; i++) {
             links = attributes[i];
             console.log(i + " links are " + links);
             var tr = document.createElement('TR');
             var th = document.createElement('TH');
             th.style.width  =first_column_width;
             th.style.color = header_color;

             th.appendChild(document.createTextNode(headings[i]));
             tr.appendChild(th);
      
             var td = document.createElement('TD');
             for (j = 0; j < links.length; j++) {
                   if (j > 0){
                      comma = document.createTextNode(",  ");
                      td.appendChild(comma);
                   }
                   td.appendChild(links[j]);
             }
             tr.appendChild(td);
             tableBody.appendChild(tr);
        }
        table.appendChild(tableBody); 
        return table;
}


function createMasterTable(headings, attributes) {
     // creates table of components by type (e.g. ocean)
      console.log("in createMasterTable");
      console.log("     headings are: " + headings);
      console.log("     table data is: " + attributes);
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');

      table.id = "master_table";
      table.className = w3_classes += " w3-border-dark-grey";
      table.style.borderColor = "#333";

      //create header row
      var tr = document.createElement('TR');
      for (i = 0; i < headings.length; i++) {
          var th = document.createElement('TH');
          if (i==0) { // model name
             th.style.width = "15%";
          }else if (i==1){ // grids
             th.style.width = "25%";
          }else if (i==2){ // access
             th.style.width = "35%";
          }else if (i==3){ // associated coupled models
             th.style.width = "25%";
          }
          
          th.style.textAlign = "left";
          th.style.color = header_color;
          th.appendChild(document.createTextNode(headings[i]));
          tr.appendChild(th);
       }
        tableBody.appendChild(tr);
     
        for (i = 0; i < attributes.length; i++) {
              var tr = document.createElement('TR');
              var columns = attributes[i];
              //console.log("    column data for table row " + i + " is "  + columns);
              // loop over column data
              console.log("    number of columns for this row is " + columns.length);

              // first column (name of model as a link)
              var td = document.createElement('TD');
              td.style.wordWrap ="break-word";
              name = columns[0];
              a = createLink(" ", name);
              console.log ("     link to click is " + a);
              a.setAttribute("onclick", "return listMetadata('"+name+"')");
              td.appendChild(a);
              tr.appendChild(td);
              console.log("    done with column 1");

              // second column (grids)
              var td2 = document.createElement('TD');
              td2.appendChild(document.createTextNode(columns[1]));
              tr.appendChild(td2);
              console.log("    done with column 2");
              

              // third column (code access)
              var td3 = document.createElement('TD');
              var text = columns[2] + " ";
              td3.appendChild(document.createTextNode(text));
              if (typeof(columns[3]) != "undefined"){
                  td3.appendChild(document.createTextNode("See link: "));
                  a1 = createLink(columns[3],columns[4]);
                  td3.appendChild(a1);
                  console.log("    done with part 1 of column 3");
              }

              if (typeof(columns[5]) != "undefined"){
                  br = document.createElement('br');
                  td3.appendChild(br);
                  var text2 = columns[5] + " ";
                  td3.appendChild(document.createTextNode(text2));
                  if (typeof(columns[6]) != "undefined"){
                       td3.appendChild(document.createTextNode("See link: "));
                       a2 = createLink(columns[6],columns[7]);
                       td3.appendChild(a2);
                  }
                  console.log("    done with part 2 of column 3");
              }
              tr.appendChild(td3);
              
              // fourth column (associated coupled models)
              var td4 = document.createElement('TD');
              td4.appendChild(document.createTextNode(columns[8]));
              tr.appendChild(td4);


              tableBody.appendChild(tr);
     }
     table.appendChild(tableBody);
     return table;
}

function deleteTable(container_id, table_id){
     // deletes a table so we can draw a new one. Otherwise they both exist one after the other.
      console.log("in deleteTable");
      console.log("      container is  "+ container_id);
      console.log("      id of table is " + table_id);
      try {
             var table = document.getElementById(table_id);
      } 
      catch(err){
             alert(err.message);
      }

      try {
             var container = document.getElementById(container_id);
      } 
      catch(err){
             alert(err.message);
      }
      if  (table != null) {
          console.log("    removing " + table_id + " table");
          try {
                container.removeChild(table);
          }
          catch(err){
                alert(err.message);
                alert("container is " + container);
                alert("container id is "  + container_id);
          }
     }
     return false;
}


function createSimpleTable(id, titles, attributes){
//this table has no headers 

         console.log("in createSimpleTable");
         var table = document.createElement('TABLE');
         var tableBody = document.createElement('TBODY');
         table.className = w3_classes;
         table.id = id;

         for (i = 0; i < titles.length; i++) {
             var tr = document.createElement('TR');
             var td = document.createElement('TD');
             if (typeof attributes[i]  == 'undefined'){
                  //console.log("      attribute is undefined");
                  attributes[i] = "no answer provided";
             }
             a = createLink(attributes[i],titles[i])
             td.appendChild(a);
             td.style.fontWeight = "normal";
             tr.appendChild(td);
             tableBody.appendChild(tr);
        }
     table.appendChild(tableBody);
     return table;

}

function createTable(id,headings,attributes){
         console.log("in createTable");
         var table = document.createElement('TABLE');
         var tableBody = document.createElement('TBODY');

         table.className = w3_classes; 
         table.id = id;

         for (i = 0; i < headings.length; i++) {
              var tr = document.createElement('TR');
              var th = document.createElement('TH');
              var td = document.createElement('TD');
              th.style.width= first_column_width;
              th.style.color= header_color;
              td.style.wordWrap ="break-word";

              th.appendChild(document.createTextNode(headings[i]));
               tr.appendChild(th);
              if (i ==0 ){
                  td.setAttribute("id", "short_name");  // set id where short name lives so we can query it later
              }
             
              //console.log('   looking for undefined ' + attributes[i]);
              if (typeof attributes[i]  == 'undefined'){
                   //console.log("      attribute is undefined");
                   attributes[i] = "no answer provided";
              }
              td.appendChild(document.createTextNode(attributes[i]));
              tr.appendChild(td);
              tableBody.appendChild(tr);
         }
         table.appendChild(tableBody); 
         return table;
}


function clearUndefined(array){
       // requires a 1D array, so call in a loop if necessary. 
       var new_array = [ ];
       console.log(" in clearUndefined");
       for (k = 0; k < array.length; k++){
            if (typeof array[k]  == 'undefined'){
                  new_array[k] = " "; // empty string if no answer is provided
            }else{
            new_array[k] = array[k]
            }
            console.log("     value of new_array is " + i + " " + new_array[k]);       
        }
       return new_array;
}

function skipEmptyLinks(array){
       var new_array = [];
       for (k = 0; k < array.length; k++){
            if (typeof array[k]  != 'undefined'){
                  new_array[k] = array[k];
            }
        }
        return new_array;
}

function getQueryString() {
       console.log("in getQueryString");
       var query = window.location.search.slice(1);
       console.log("    query string is " +  query);
       return query;
}
   
function clearTabs(class_name){
     var tab_unselected_color = "#E9F5F6";
     console.log("in clearTabs");
     tablinks = document.getElementsByClassName(class_name);
     for (i = 0; i < tablinks.length; i++) {
          tablinks[i].style.backgroundColor = tab_unselected_color;
          tablinks[i].style.color = "#666";
     }
     return false;
}
  

function createLink(url, title) {
     var a = document.createElement('a');
     var linkText = document.createTextNode(title);
     a.appendChild(linkText);
     a.title = title;
     a.href = url;
     a.style.color = "#358C92";
     a.style.textDecoration = "none";
     a.setAttribute('target', 'top');   // ensures links open outside of the iframe
     document.body.appendChild(a);
     return a;
}
function hideEverything(){
    x = document.getElementsByClassName("metadata");
    
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    return false;
}

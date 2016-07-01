function clearUndefined(array){

       for (i = 0; i < array.length; i++){
            if (typeof array[i]  == 'undefined'){
                  array[i] = " "; // empty string if no answer is provided
            }
        }
        return array;
}

function skipEmptyLinks(array){
       var new_array = [];
       for (i = 0; i < array.length; i++){
            if (typeof array[i]  != 'undefined'){
                  new_array[i] = array[i];
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

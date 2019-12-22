var screen = document.getElementById("ft_list");
var tab=[];
var index = 0;

function strIsEmpty(str) {
    return (str.length === 0 || !str.trim());
} 

function toDoList(){
    //the textNode must be created, inoder to append this text to the div as child
    let list = prompt("Write your to do list here.");
    if(!strIsEmpty(list)){
        listCreator(list);
        update_cookies();
    }
}

function listCreator(list){
    let contentNode = document.createTextNode(list);
    tab[index] = list;
    index++;
    var newDiv = document.createElement("div");
    newDiv.appendChild(contentNode);
    newDiv.addEventListener("click", function(){
        var conf = confirm("Do you really want to delete?")
        if(conf){
            var deleteText = newDiv.innerHTML;
            var dIndex = tab.indexOf(deleteText);
            tab.splice(dIndex, 1);
            update_cookies();
            var oldChild = screen.removeChild(newDiv);
        }
    })
    screen.insertBefore(newDiv, screen.childNodes[0]);
}
// a function that i can remove the cookie during the correction, need to create a button event for this
//function removeCookies() {
//    var res = document.cookie;
//    var multiple = res.split(";");
//    for(var i = 0; i < multiple.length; i++) {
//       var key = multiple[i].split("=");
//       document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
//    }
// }

function update_cookies()
{
  var json_str = JSON.stringify(tab);
  document.cookie = "todos="+json_str;
}

function keepcookie(){
    var i = 0;
    if(document.cookie){
        var cook = document.cookie;
        var newtab = cook.split("=");
        var listArray = JSON.parse(newtab[1]);
        listArray.forEach(ele => listCreator(ele));        
    }
}



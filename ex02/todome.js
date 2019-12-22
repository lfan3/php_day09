/*********************************************************************************
 * i keep a trace of this document is maily for the cooking gestion.
 * so how to automacly define the cookie time.
 * i solve at this moment the json.parse problem
 * but in fact , there is directly methode to apply , i should not use json file
 ********************************************************************************/

var screen = document.getElementById("ft_list");
var tab=[];
var index = 0;

function toDoList(){
    //the textNode must be created, inoder to append this text to the div as child
    let list = prompt("Write your to do list here.");
    listCreator(list);
    update_cookies();
}

function listCreator(list){
    let contentNode = document.createTextNode(list);
    tab[index] = list;
    index++;
    var newDiv = document.createElement("div");
    newDiv.appendChild(contentNode);
    newDiv.addEventListener("click", function(){
        var conf = confirm("Do you really want to delete?")
        if(conf)
            var oldChild = screen.removeChild(newDiv);
    })
    screen.insertBefore(newDiv, screen.childNodes[0]);
}

function removeCookies() {
    var res = document.cookie;
    var multiple = res.split(";");
    for(var i = 0; i < multiple.length; i++) {
       var key = multiple[i].split("=");
       document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
 }

function update_cookies()
{
  var json_str = JSON.stringify(tab);
  var cname = "todos"
  var d = new Date();
  //keep cooking only valide for one minute
  d.setTime(d.getTime() + (1*60*1000));
  var expires = "expires=" + d.toUTCString();
 // document.cookie = "todos="+json_str;
  document.cookie = cname + "="+json_str + expires;
  console.log("cookie " + document.cookie);
}

function keepcookie(){
    var i = 0;
    if(document.cookie){
        var cook = document.cookie;
        var co = decodeURIComponent(document.cookie);
        console.log("cookie dans keep " + co);
        var ca = co.split(';');
        console.log("ca "+ ca);
        var newtab = cook.split("=");
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            console.log("frist c "+ c);
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
            console.log("c "+ c);
            console.log("i am there");
          }
        var  name="todos=";
        if (c.indexOf("todos=") == 0) {
            var substr = c.substring(name.length, c.length);
            console.log("cSub", substr);
            var j = 0;
            while(substr[j]){
                if (substr[j] == ']')
                    var k = j;
                j++;
            }
            console.log("sub " + substr.substring(0, k + 1));
            var listArray = JSON.parse(substr.substring(0, k+1));
            listArray.forEach(ele => listCreator(ele)); 

            return c.substring(name.length, c.length);          
        }
        }
        //if (c.indexOf(name) == 0) {
        //    return c.substring(name.length, c.length);
        //  }
        console.log("new tab "+newtab);
        var listArray = JSON.parse(newtab[1]);
      //  console.log("test "+test);
      //  test.forEach(ele => console.log("testArray " + ele));
        listArray.forEach(ele => listCreator(ele));        
    }
}



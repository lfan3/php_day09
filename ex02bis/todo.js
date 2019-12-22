// not forget to remove the cookie

$(document).ready(function(){
    var tab=[];
    var index = 0;

    function strIsEmpty(str) {
        return (str.length === 0 || !str.trim());
    }
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
    function listCreator(list){
        let contentNode = document.createTextNode(list);
        tab[index] = list;
        index++;
        this.$OuterDiv = $('<div></div>').text(list);
        $OuterDiv.bind('click', function(){
            var conf = confirm("Do you really want to delete?");
            if(conf){
                var deleteText = $(this).innerHTML;
                var dIndex = tab.indexOf(deleteText);
                tab.splice(dIndex, 1);
                update_cookies();
                $(this).remove();
            }
        })
        $OuterDiv.insertAfter($('#ft_list').first());
    }

    $('#button').click(function(){
        let list = prompt("Write your to do list here.");
        if (!strIsEmpty(list)){
            listCreator(list);
            update_cookies();
        }
    })
    $(window).load(function(){
          keepcookie();
    })
   
})


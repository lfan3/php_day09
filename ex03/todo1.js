// not forget to remove the cookie
//concate javascript +, php .
$(document).ready(function(){
    var tab=[];
    var index = 0;

    $('#button').click(function(){
        let list = prompt("Write your to do list here.");
        if (!strIsEmpty(list)){
        //    listCreator(list);
            insertList(list);
         //   keepcookie();
         //   update_cookies();
        }
    })
    
    $(window).load(function(){
          keepcookie();
    })
    function strIsEmpty(str) {
        return (str.length === 0 || !str.trim());
    }
    function update_cookies()
    {
      var json_str = JSON.stringify(tab);
      document.cookie = "todos="+json_str;
    }
    function keepcookie(){
        $.post("select.php", function(data, status){
            if(data){
                var array = JSON.parse(data);
                array.forEach(function(item){
                    var list = item.split(";");
                    var n_id = list[0];
                    var n_task = list[1];
                    showNewest(n_task);
                })
            }
        })
    }
    function showNewest(list){
        this.$OuterDiv = $('<div></div>').text(list);
        $OuterDiv.insertAfter($('#ft_list').first());
     
        $OuterDiv.bind('click', function(){
            var conf = confirm("Do you really want to delete?");
            if(conf){
                var deleteText = $(this).innerHTML;
                $.post("delete.php", 
                {
                    task : deleteText
                },
                function(data,status){});
//
            //    }
            //    var dIndex = tab.indexOf(deleteText);
            //    tab.splice(dIndex, 1);
            ////    update_cookies();
            //    $(this).remove();
            //}
            }       
    });
    function insertList(list){
        let contentNode = document.createTextNode(list);
        $.post("insert.php",
        {
            id : index,
            task : list
        },
        function(data, status){ 
        });
        showNewest(list);
    }

    function listCreator(list){
        let contentNode = document.createTextNode(list);
        $.post("insert.php",
        {
            id : index,
            task : list
        },
        function(data, status){           
        });
        index++;
        $.post("select.php", function(data, status){
            var array = JSON.parse(data);
            array.forEach(function(item){
                var list = item.split(";");
                var n_id = list[0];
                var n_task = list[1];
                $("#ft_list").prepend("<div id =" + n_id + ">"+n_task+"</div>");
                $("#"+n_id).bind('click', function(){
                var conf = confirm("Do you really want to delete?");
                /*
                if(conf){
                    var deleteText = $(this).innerHTML;
                    var dIndex = tab.indexOf(deleteText);
                    tab.splice(dIndex, 1);
                    update_cookies();
                    $(this).remove();
                }*/
                })
            });
        });
    
    }

    

/*
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
        $OuterDiv.insertAfter($('#ft_list').first());*/
   


});



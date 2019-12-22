// not forget to remove the cookie
//concate javascript +, php .
$(document).ready(function(){
    var tab=[];
    var index = 0;

    $.ajax({
        url : 'select.php',
        type : 'POST',
        dataType : 'json',
        success : function(code_html, statut){ // code_html contient le HTML renvoyé
            var o = 0;
            while (code_html[o])
            {
                var split = code_html[o].split(";");
                   var id = split[0];
                   var tak = split[1];
                $("#ft_list").prepend("<div onclick=del(this) id="+id+">"+tak+"</div>");
                o++;
                index++;
            }
       }
    })	   

    $("#button").click(function(){
    	
    	var persson = prompt("Entrez la chose a remettre au lendemain");
    	if (!strIsEmpty(persson)) 
    	{
        $.ajax({
        	url : 'insert.php',
        	type : 'POST',
        	data : 'id='+ i +'& task='+persson,
        	dataType : 'html',
        	success : function(code_html, statut){ // code_html contient le HTML renvoyé
	           var split = code_html.split(" ");
	           var id = split[0];
	           var tak = split[1];
	           $("#ft_list").prepend("<div onclick=del(this) id="+id+">"+tak+"</div>");
	       }
        });
		i++;
        }
    });
  
    function strIsEmpty(str) {
        return (str.length === 0 || !str.trim());
    }
   
 

});



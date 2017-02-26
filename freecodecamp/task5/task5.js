/**
 * Created by Administrator on 2016/11/25.
 */
$(document).ready(function () {
   $("#search").on("click",function () {
       var searchText=$(".searchText").val();
       console.log(searchText);
       $.ajax({
           url:"https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchText+"&limit=10&format=json",
           type: "GET",
           crossDomain: true,
           dataType: 'JSONP',
           success:function(data){
                console.log(data);
               $('#searchResults').empty();
               for(var i = 0; i < data[1].length; i++){
                   var content=data[2][i],title=data[1][i];
                   if(content.length>160){
                       content=content.substring(0,160)+"....."
                   }
                   if(title.length>=8){
                       title=content.substring(0,6)+".."
                   }
                   var contents = "<div class='result'><a href='"+data[3][i]+"'><h3>"+parseInt(i+1)+"</h3><h4>"+title+"</h4><p>"+content+"<p></a></div>";
                   $('.searchResults').append(contents);
               }
           }
       });
   })
});




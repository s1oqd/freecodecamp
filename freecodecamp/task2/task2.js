/**
 * Created by Administrator on 2016/11/25.
 */
$(document).ready(function () {
    $(".query").on('click',function(){
        $.ajax({
            url:"http://v.juhe.cn/weather/index",
            type: "GET",
            // contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data:{'cityname':$('.city').val(),'key':'a89c75a52a4821f828e9881e01607a6a'},
            crossDomain: true,
            dataType: 'JSONP',
            success:function(data){
                var result=data.result,futureData="";
                if(result){
                    $('table').css('border-width','1px');
                var today=result.today,future=result.future;
                    $(".today").html("<tr>"+"<td>"+"城市"+"</td>"+"<td>"+today.city+"</td>"+"</tr>"+
                        "<tr>"+"<td>"+"时间"+"</td>"+"<td>"+today.date_y +today.week +"</td>"+"</tr>"+
                        "<tr>"+"<td>"+"气温"+"</td>"+"<td>"+today.temperature+"</td>"+"</tr>"+
                        "<tr>"+"<td>"+"注意事项"+"</td>"+"<td>"+today.dressing_advice+"</td>"+"</tr>"
                    );
                    for (var i in future) {
                        futureData+="<tr>"+"<td>"+future[i].date +"</td>"+"<td>"+future[i].week+"</td>"+
                            "<td>"+future[i].temperature +"</td>"+"<td>"+future[i].wind+"</td>"+
                            "<td>"+future[i].weather+"</td>"+"</tr>";
                    }
                    $(".future").html(futureData);
                }else{
                    $('.error').html(data.reason);
                    $(".today").html('');
                }

        }});
    });
});
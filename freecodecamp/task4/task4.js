/**
 * Created by Administrator on 2016/11/25.
 */
$(document).ready(function () {
    var b=true,c=false,k=true,t,taskTime=25,restTime=5;
    $(".taskTime span").text(taskTime);
    $(".restTime span").text(restTime);
    $(".time").on("click",function () {
        if(!c){
            c=true;
            $(".minus").attr({"disabled":"disabled"});
            $(".plus").attr({"disabled":"disabled"});
            t=setInterval(timedCount,1000);
        }else {
            c=false;
            $(".minus").removeAttr("disabled");
            $(".plus").removeAttr("disabled");
            clearInterval(t);
        }
    });
    if(!c){
            $(".taskTime .minus").on("click",function () {
                taskTime--;
                if(taskTime<0){
                    taskTime=0;
                }
                $(this).next().text(taskTime);
                if(b){ k=true; $(".time span").animate({'height': 0});$(".timing").text(taskTime);}
            });
            $(".taskTime .plus").on("click",function () {
                taskTime++;
                $(this).prev().text(taskTime);
                if(b){k=true;$(".time span").animate({'height': 0});$(".timing").text(taskTime);}
            });
            $(".restTime .minus").on("click",function () {
                restTime--;
                if(restTime<0){
                    restTime=0;
                }
                $(this).next().text(restTime);
                if(!b){ k=true; $(".time span").animate({'height': 0});$(".timing").text(restTime);}
            });
            $(".restTime .plus").on("click",function () {
                restTime++;
                $(this).prev().text(restTime);
                if(!b){  k=true;$(".time span").animate({'height': 0});$(".timing").text(restTime);}
            });
    }
    function timedCount(){
        if(k){
            k=false;
            if(b){
                setTime(taskTime*60);
            }else{
                setTime(restTime*60);
            }
        }else{
            var s=getSeconds($(".timing").text().split(":").reverse());
            s--;
            setTime(s);
            if(b){
            $(".time span").animate({'height': '+='+Math.abs(300/(taskTime*60))+'px'});
            }else {
            $(".time span").animate({'height': '+='+Math.abs(300/(restTime*60))+'px'});
            }
            if(s===0){
                k=true;
                if(b){
                    b=false;
                    $(".time span").css('background-color','#5cb85c');
                    $(".time span").animate({'height': 0});
                    $(".title").text("restTime");
                    $(".timing").text(restTime);
                }else{
                    b=true;
                    $(".time span").css('background-color','#d43f3a');
                    $(".time span").animate({'height': 0});
                    $(".title").text("taskTime");
                    $(".timing").text(taskTime);
                }
            }
        }
    }
    function setTime(d) {
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        $(".timing").text((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }
    function getSeconds(time) {
        var seconds=0;
        switch (time.length){
            case 3:seconds+=parseInt(time[2])*3600;
            case 2:seconds+=parseInt(time[1])*60;
            case 1:seconds+=parseInt(time[0]);
                break;
        }
        return seconds;
    }
});


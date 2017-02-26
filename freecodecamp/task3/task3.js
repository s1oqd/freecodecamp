/**
 * Created by Administrator on 2016/11/25.
 */
$(document).ready(function () {
    var calc="",clear = false,cal=[],ss="",aa;
    $(".buttons li").click(function() {
        var text = $(this).text();
        if(parseInt(text, 10) == text || text === "." || text === "/" || text === "*" || text === "-" || text === "+" || text === "%") {
            if(clear === false) {
                if(text === "/" || text === "*" || text === "-" || text === "+" || text === "%"){
                    cal.push(ss);
                    cal.push(text);
                    ss="";
                    console.log(cal);
                }else{
                    ss+=text;
                }
                calc+=text;
                $(".textbox").val(calc);
            }else {
                if(text === "/" || text === "*" || text === "-" || text === "+" || text === "%"){
                    cal.push(aa);
                    cal.push(text);
                    ss="";
                    calc = aa+text;
                    console.log(cal);
                }else{
                    ss=text;
                    calc = text;
                }
                $(".textbox").val(calc);
                clear = false;
            }
        }else if(text === "AC") {
            ss="";
            calc = "";
            cal=[];
            $(".textbox").val("");
        } else if(text === "CE") {
            ss=ss.slice(0, -1);
            cal=cal.slice(0, -1);
            calc = calc.slice(0, -1);
            $(".textbox").val(calc);
        } else if(text === "=") {
            cal.push(ss);
            console.log(cal);
            aa = evalRpn(cal);
            $(".textbox").val(aa);
            clear = true;
        }
    });
    function getResult (num1, num2,symbol) {
        var sq1,sq2,m,r1,r2;
        try {
            sq1 = num1.toString().split(".")[1].length;
        }catch (e) {
            sq1 = 0;
        }
        try {
            sq2 = num2.toString().split(".")[1].length;
        }catch (e) {
            sq2 = 0;
        }
        r1=Number(num1.toString().replace(".",""));
        r2=Number(num2.toString().replace(".",""));
        m = Math.pow(10,Math.max(sq1, sq2));
        var n=(sq1>=sq2)?sq1:sq2;

        if(symbol==="+"){
            return (num1 * m + num2 * m) / m;
        }else if(symbol==="-"){
            return ((num2*m-num1*m)/m).toFixed(n);
        }else if(symbol==="/"){
            return (r1/r2)*Math.pow(10,sq2-sq1);
        }else if(symbol==="*"){
            return r1*r2/Math.pow(10,sq2+sq1);
        }else if(symbol==="%"){
            return num1%num2;
        }
    }
    console.log(parseInt(0.1, 10) == 0.1);
    function evalRpn(rpnQueue){
        var outputStack = [];
        while(rpnQueue.length > 0){
            var cur = rpnQueue.shift();
            if(parseFloat(cur) == cur ){
                outputStack.push(cur);
            }else{
                var fuhao=cur;
            }
            if(outputStack.length >=2){
                console.log(outputStack);
                var sec = outputStack.pop();
                var fir = outputStack.pop();
                outputStack.push(getResult(fir, sec, fuhao));
            }
        }
        if(outputStack.length === 1){
            return outputStack[0];
        }
    }
});


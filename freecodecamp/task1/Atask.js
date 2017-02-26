/**
 * Created by Administrator on 2016/11/22.
 */
(function () {
    function getQuote() {
        $.ajax({
            headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
            success: function(response) {
                var r = JSON.parse(response);
                currentQuote = r.quote;
                currentAuthor = r.author;
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
                $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
                $(".quote-text h1").text(r.quote);
                $(".quote-text p").html(r.author);
                var color = function(){
                    return Math.floor(Math.random() * 255)
                };
                var rgb="rgb("+color()+","+color()+","+color()+")";
                $("body").css({
                    backgroundColor: rgb,
                    color: rgb
                });
                $(".buttons a").css("backgroundColor",rgb);
            }
        });
    }
    $(document).ready(function () {
        getQuote();
            $(".quote-box").on("click",function (event) {
                switch(event.target.id){
                    case "tweet-quote":
                        window.open(event.target.href);
                        break;
                    case "tumblr-quote":
                        window.open(event.target.href);
                        break;
                    case "new-quote":
                        getQuote();
                        break;
                }
            })
        }
    )
})();
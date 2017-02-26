/**
 * Created by Administrator on 2016/11/25.
 */
$(document).ready(function () {
    var users =  ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"]
    getStream();
    $(".selector").on("click",function() {
        $(".selector").removeClass("active");
        $(this).addClass("active");
        var status = $(this).attr('id');
        if (status === "all") {
            $(".online, .offline").removeClass("hidden");
        } else if (status === "online") {
            $(".online").removeClass("hidden");
            $(".offline").addClass("hidden");
        } else {
            $(".offline").removeClass("hidden");
            $(".online").addClass("hidden");
        }
    });
    function getStream() {
        users.forEach(function(user){
            var games, status,logos,channelLink,username,htmls;
            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/streams/'+user+ '?client_id=jf0xuu0rmvk4lnnos1rws48m7bmfk4',
                success: function(data) {
                    if (data.stream === null) {
                        status = "offline";
                        $.ajax({
                            type: 'GET',
                            url: 'https://api.twitch.tv/kraken/channels/'+user+ '?client_id=jf0xuu0rmvk4lnnos1rws48m7bmfk4',
                            success: function(data) {
                                games = data.game === null? "...": data.game;
                                logos = data.logo != null ? data.logo : "#";
                                channelLink = data.url;
                                username = data.display_name;
                                htmls = "<div class='playBox offline'><div class='logos'><img src='"+logos+"'></div>" +
                                    "<a href='"+channelLink+"' target='_blank'>"+username+"</a>" +
                                    "<p class='text-center'>"+status+"</p>" +
                                    "<p class='text-center username'>"+games+"</p></div>";
                                $(".plays").append(htmls);
                            }
                        });
                    } else {
                        games = data.stream.game;
                        status = "online";
                        channelLink = data.stream.channel.url;
                        username = data.stream.channel.display_name;
                        logos = data.stream.channel.logo != null ? data.stream.channel.logo : "#";
                        htmls = "<div class='playBox online'><div class='logos'><img src='"+logos+"'></div>" +
                            "<a href='"+channelLink+"' target='_blank'>"+username+"</a>" +
                            "<p class='text-center'>"+status+"</p>" +
                            "<p class='text-center username'>"+games+"</p></div>";
                        $(".plays").prepend(htmls);
                    }

                }
            });

        });
    }
});

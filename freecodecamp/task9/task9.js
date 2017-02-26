/**
 * Created by Administrator on 2016/11/25.
 */
// document.addEventListener("DOMContentLoaded", loadProjects());
//
$(document).ready(function () {
    var html = "<h2>Projects</h2>";
    var projects = [
        ["弹幕墙", "http://s.codepen.io/s1oqd/full/yVRrvX", "http://oldf1xu4o.bkt.clouddn.com/image/projects/yVRrvX.png", "1"],
        ["计算器", "http://s.codepen.io/s1oqd/full/KNQrwZ", "http://oldf1xu4o.bkt.clouddn.com/image/projects/KNQrwZ.png", "2"],
        ["番茄时钟", "http://s.codepen.io/s1oqd/full/GNdYaa", "http://oldf1xu4o.bkt.clouddn.com/image/projects/GNdYaa.png", "3"],
        ["Twitch Streamers", "http://s.codepen.io/s1oqd/full/aBRNZg", "http://oldf1xu4o.bkt.clouddn.com/image/projects/aBRNZg.png", "4"],
        ["五子棋", "http://s.codepen.io/s1oqd/full/woYZXG", "http://oldf1xu4o.bkt.clouddn.com/image/projects/woYZXG.png", "5"],
        ["game", "http://s.codepen.io/s1oqd/full/EZxmeq", "http://oldf1xu4o.bkt.clouddn.com/image/projects/EZxmeq.png", "6"],
        ["搜索", "http://s.codepen.io/s1oqd/full/gLdMaQ", "http://oldf1xu4o.bkt.clouddn.com/image/projects/gLdMaQ.png", "7"],
        ["随机", "http://s.codepen.io/s1oqd/full/dOWmPq", "http://oldf1xu4o.bkt.clouddn.com/image/projects/dOWmPq.png", "8"],
        ["天气查询", "http://s.codepen.io/s1oqd/full/YpQjmo", "http://oldf1xu4o.bkt.clouddn.com/image/projects/YpQjmo.png", "9"]
    ];
    function loadProjects() {
        for (var i = 0; i < projects.length; i++) {
            html += "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'>"
                +"<div class='thumbnail'>"
                +"<a href='" + projects[i][3] + "'></a>"
                +"<img class='project-image' src='" + projects[i][2] + "'/>"
                // +"<iframe src='"+projects[i][1]+"'  frameborder='0' data-username='/s1oqd' sandbox='allow-scripts allow-pointer-lock allow-same-origin'></iframe></div>"
                +"<div class='caption'><h3><a href='" + projects[i][1] + "'>" + projects[i][0] + "</a></h3>"
                +"<p>" + projects[i][3] + "</p>"
                +"</div></div></div>";
            console.log(html);
        }
        $(".projects").html(html);
    }
    loadProjects();
    $('#nav li').on('click',function(){
        $("#nav li").removeClass('active');
        $(this).addClass('active')
    });
});

// html += "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'><div class='project'>"
// <div class='iframe'>
//     + "<img class='project-image' src='" + projects[i][1] + "'/>"
//     + "<div class='p" + "roject-text'><h3 class='project-name'>" + projects[i][0] + "</h3>"
//     +"<p class='project-description'>" + projects[i][2] + "</p>"
//     + "<a class='project-link' target='_blank' href='" + projects[i][3] + "'>View on CodePen</a>"
//     +"</div></div></div>";



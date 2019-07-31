(function($) {
    $.fn.menu = function(b) {
        var c,
        item,
        httpAdress;
        b = jQuery.extend({
            Speed: 220,
            autostart: 1,
            autohide: 1
        },
        b);
        c = $(this);
        item = c.children("ul").parent("li").children("a");
        httpAdress = window.location;
        item.addClass("inactive");
        function _item() {
            var a = $(this);
            if (b.autohide) {
                a.parent().parent().find(".active").parent("li").children("ul").slideUp(b.Speed / 1.2, 
                function() {
                    $(this).parent("li").children("a").removeAttr("class");
                    $(this).parent("li").children("a").attr("class", "inactive")
                })
            }
            if (a.attr("class") == "inactive") {
                a.parent("li").children("ul").slideDown(b.Speed, 
                function() {
                    a.removeAttr("class");
                    a.addClass("active")
                })
            }
            if (a.attr("class") == "active") {
                a.removeAttr("class");
                a.addClass("inactive");
                a.parent("li").children("ul").slideUp(b.Speed)
            }
        }
        item.unbind('click').click(_item);
        if (b.autostart) {
            c.children("a").each(function() {
                if (this.href == httpAdress) {
                    $(this).parent("li").parent("ul").slideDown(b.Speed, 
                    function() {
                        $(this).parent("li").children(".inactive").removeAttr("class");
                        $(this).parent("li").children("a").addClass("active")
                    })
                }
            })
        }
    }
})(jQuery);

$(document).ready(function(){

    var $contents = $("section.content div.main_content");
    $contents.show().siblings("div").hide();
    
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();

        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;  
    }
    var Request = new Object();
    Request = GetRequest();// var id=Request["id"]; 
    Go(Request["groundID"], $('#'+Request["groundID"]).attr('level'));
    function Go(id, flag) {
        let $tab = $(this);
        let groundID = "groudID=" + id + "&productID=13";
        location.hash = groundID; //此时地址栏后面变成groundID=&productID=13
        index = $tab.parents().index("li");
        // alert(index);
        let $content = $("div."+id);
        $content.show()
            .siblings().hide();
        if(flag == 3) {
            $content.parent().show()
            .siblings().hide();
        }else if(flag == 4) {
            $content.parent().
            siblings().hide();
            $content.parent().parent().show()
            .siblings().hide();
        }
        $("div#goTop").show();
        // 回到顶部
        $('body,html').animate({scrollTop:0},1000);
        return location.hash;
    };

    $("div#goTop").show();

    $("body").keydown(function (event) { 
        if(event.keyCode == 13) {
            var searchContent = $("header nav div div.nav_right input#sousuo").val();
            if(searchContent != "") {
                Mock.mock("../lesson/API_studio.html", {
                    "search": searchContent
                });
                $.ajax({
                    url: "../lesson/API_studio.html",
                    dataType: "json"
                }).done(function(data, status, xhr) {
                    alert(
                        JSON.stringify(data, null, 4)
                    )
                });
            }
            $("input#sousuo").click();
            window.location="/q/" + $(this).val(); 
        }
    });

});


    
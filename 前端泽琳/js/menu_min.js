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

    // 使用hide和show实现虚拟路由
    // var $notMainContent = $(".content div:not(#main_content)");
    // $notMainContent.hide();
    // $(".menu ul li").menu();
    // $(".menu ul li").click(function(){
    //     $(".menu ul li").removeClass("current");
    //     $(this).addClass("current");
    //     var index=$(this).prevAll().length;
    //     $(".content div").hide();
    //     $(".content div").eq(index).show();
    //     // $(".content div").eq(index).load("#/../markdown/API_Studio.md",function(responseMd,statusMd,xhr){
    //     //     if(statusMd=="success"){
    //     //         alert("Success");
    //     //     }else{
    //     //         alert("Error: "+xhr.status+": "+xhr.statusMd);
    //     //     }
    //     //     consolo.log(xhr);
    //     // });
    // });

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
    // $("../search_result.html").ready(function(){
    //     $.getJSON("../lesson/API_studio.html",
    //         function (data, textStatus, jqXHR) {
    //             var html = "<h1>" + data["search"] + "</h1>";
    //             alert(html);
    //             $("#quanbu").html(html);
    //             console.log(textStatus);
    //         }
    //     );
    // });

    

    // $(".menu ul li ul li ul li").click(function(){
    //     $(".menu ul li ul li ul li").removeClass("current");
    //     $(this).addClass("current");
    //     var index=$(this).prevAll().length;
    //     $(".content div").hide();
    //     $(".content div div").eq(index).show();
    // });
});




// 多视图单页路由

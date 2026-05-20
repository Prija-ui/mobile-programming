$(document).ready(function(){

    $("#start").click(function(){

        // Move to Bottom Left
        $("#box").animate({
            left:"0px",
            top:"300px"
        },1000,function(){

            $(this).css("background","blue");

            // Move to Bottom Right
            $(this).animate({
                left:"300px",
                top:"300px"
            },1000,function(){

                $(this).css("background","green");

                // Move to Bottom Left Again
                $(this).animate({
                    left:"0px",
                    top:"300px"
                },1000,function(){

                    $(this).css("background","orange");

                    // Move to Top Right
                    $(this).animate({
                        left:"300px",
                        top:"0px"
                    },1000,function(){

                        $(this).css("background","purple");

                        // Back to Original Position
                        $(this).animate({
                            left:"0px",
                            top:"0px"
                        },1000,function(){

                            $(this).css("background","red");

                            alert("Back to original position!");

                        });

                    });

                });

            });

        });

    });

});
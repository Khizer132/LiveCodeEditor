/*function outputPanel(){
    $("#outputPanel").contents().find("html").html("<html><head><style type='text/css'>" + $("#cssPanel").val() +  "</style></head><body>" + $("#htmlPanel").val() + "</body> </html>");
    document.getElementById('outputPanel').contentWindow.eval($("#jsPanel").val());
};*/

function outputPanel() {
    let htmlContent = $("#htmlPanel").val();
    let cssContent = $("#cssPanel").val();
    let jsContent = $("#jsPanel").val();

    let iframe = $("#outputPanel")[0].contentWindow.document;

    iframe.open();
    iframe.write(`
        <html>
        <head>
            <style>${cssContent}</style>
        </head>
        <body>
            ${htmlContent}
            <script>${jsContent}<\/script>
        </body>
        </html>
    `);
    iframe.close();
}

$(".toggleButton").hover(function(){
    $(this).addClass("highlightedBtn");

}, function(){
    $(this).removeClass("highlightedBtn");
});

$(".toggleBtn").click(function(){
    $(this).toggleClass("active");
    var panelId = $(this).attr("id") + "Panel";
    $("#" + panelId).toggleClass("hidden");

    var noOfActivePanels = 4 - $(".hidden").length;
    $(".panel").width(($(window).width()/noOfActivePanels) - 10);
});


$(".panel").height($(window).height() - $("#header").height() - 15);

$(".panel").width(($(window).width()/2) - 10);

outputPanel();

$("textarea").on('change keyup paste', function() {
    outputPanel();
});
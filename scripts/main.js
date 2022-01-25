//script
$(document).ready(function(){
  $(".item-list li").click(function(){
    console.log("hello" + $(this).attr("pos"));
  });
});
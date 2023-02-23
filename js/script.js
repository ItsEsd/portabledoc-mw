var url_string = window.location.href;
var url = new URL(url_string);
var q = url.searchParams.get("f");
var m = url.searchParams.get("m");
var r = url.searchParams.get("r");
var tostr = url.searchParams.toString();
var fullurl = tostr.split('%22');
if(r =="true"){
var f_urlF = (fullurl[1]);
var f_url = unescape(f_urlF.replace('+'," "));
var f_meta = m;
document.title= f_meta;
console.log(f_url);
}
else{
    document.body.innerHTML="<center><div id='nocontent'><img src='img/pdf-svg.svg'></div></center>"
}
document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    var adobeDCView = new AdobeDC.View({clientId: "cd60999abf224dbabfb9705314ec2056", divId: "adobe-view"});
    adobeDCView.previewFile({
        content:{location: {url: f_url}},
        metaData:{fileName: f_meta}
    }, {});
   
});
var url_string = window.location.href;
var url = new URL(url_string);
var q = url.searchParams.get("f");
var m = url.searchParams.get("m");
var r = url.searchParams.get("r");
var tostr = url.searchParams.toString();
var fullurl = tostr.split('%22');
var chkfltyp = fullurl[1].split('.pdf');
if(r =="true" && chkfltyp[1] ==""){
var f_urlF = (fullurl[1]);
var f_url = unescape(f_urlF.replace('+'," "));
var f_meta = m;
document.title= f_meta +" | MASTROWALL";
}
else if(r=="true" && chkfltyp.length==1){
    $('#objcont').show();
    document.getElementById('objcont').innerHTML="<object data='"+unescape(chkfltyp[0])+"' id='objfrm'></object>";
    var f_meta = m;document.title= f_meta +" | MASTROWALL";;
}

document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    var adobeDCView = new AdobeDC.View({clientId: "cd60999abf224dbabfb9705314ec2056", divId: "adobe-view"});
    adobeDCView.previewFile({
        content:{location: {url: f_url}},
        metaData:{fileName: f_meta}
    }, {});
   
});setInterval(function(){console.clear();},500);
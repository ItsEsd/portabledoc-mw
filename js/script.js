var url_string = window.location.href;
var url = new URL(url_string);
var q = url.searchParams.get("f");
var m = url.searchParams.get("m");
var r = url.searchParams.get("r");
var tostr = url.searchParams.toString();
var fullurl = tostr.split('%22');
var chkfltyp = fullurl[1].split('.pdf');
if(r =="true" && chkfltyp[1] ==""){$('#crtpdflk,#formContainer').hide();
var f_urlF = (fullurl[1]);
var f_url = unescape(f_urlF.replace('+'," "));
var f_meta = m;
document.title= f_meta +" | MASTROWALL";
}
else if(r=="true" && chkfltyp.length==1){
    $('#objcont').show();$('#crtpdflk,#formContainer').hide();
    document.getElementById('objcont').innerHTML="<object data='"+unescape(chkfltyp[0])+"' id='objfrm'></object>";
    var f_meta = m;document.title= f_meta +" | MASTROWALL";;
}

document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    var adobeDCView = new AdobeDC.View({clientId: "cd60999abf224dbabfb9705314ec2056", divId: "adobe-view"});
    adobeDCView.previewFile({
        content:{location: {url: f_url}},
        metaData:{fileName: f_meta}
    }, {});
   
});


function createForm() {
    $('#formContainer').empty();
    var form = document.createElement("form");

    var input1 = document.createElement("input");
    input1.type = "url";
    input1.name = "input1";
    input1.placeholder="PDF File Link";
    input1.setAttribute('required','required');
    form.appendChild(input1);

    var input2 = document.createElement("input");
    input2.type = "text";
    input2.name = "input2";
    input2.setAttribute('required','required');
    input2.placeholder="PDF Name"
    form.appendChild(input2);

    var submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.innerText = "Create Link";
    form.appendChild(submitBtn);

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.innerText = "Close";
    form.appendChild(closeBtn);
    closeBtn.addEventListener('click',function(){
        $('#formContainer').empty();
    });
    form.addEventListener("submit", function(event) {
      event.preventDefault(); 
      var value1 = escape('"'+input1.value+'"');
      var value2 = "&a="+escape(input2.value);
      var value3 = "&s=true";
      var result = "https://soubhikdas.in/prop/pdfviewer?d="+value1 + value2+value3;
      var input3 = document.createElement("input");
      input3.type = "text";
      input3.id = "resltlk";
      input3.value = result;
      input3.style.width='91%';
      form.appendChild(input3);
    });
    document.getElementById("formContainer").appendChild(form);
  }
 


setInterval(function(){console.clear();},500);
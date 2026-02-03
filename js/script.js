document.addEventListener("DOMContentLoaded", function () {
  function getCookie() {
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      const cookie = ca[i].trim();
      if (cookie.startsWith("mwallpswedud=")) {
        return true;
      }
    }
    return false;
  }
  if (getCookie() === false) {
    document.getElementById("crtpdflk").remove();
  }
  $(document).ready(function () {
    $("#crtpdflk").click(function () {
      createForm();
    });
  });

  function createForm() {
    $("#formContainer").empty();
    var form = document.createElement("form");

    var input1 = document.createElement("input");
    input1.type = "url";
    input1.name = "input1";
    input1.placeholder = "PDF File Link";
    input1.setAttribute("required", "required");

    var input2 = document.createElement("input");
    input2.type = "text";
    input2.name = "input2";
    input2.setAttribute("required", "required");
    input2.placeholder = "PDF Name";

    var submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.innerText = "Create Link";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.innerText = "Close";
    closeBtn.id = "clfrmpdf";
    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(submitBtn);
    form.appendChild(closeBtn);
    closeBtn.addEventListener("click", function () {
      $("#formContainer").empty();
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var value1 = escape('"' + input1.value + '"');
      var value2 = "&m=" + escape(input2.value);
      var value3 = "&r=true";
      var result = "https://pdf.mastrowall.com/?f=" + value1 + value2 + value3;

      var oldResultInput = document.getElementById("resltlk");
      if (oldResultInput) {
        oldResultInput.remove();
      }

      var input3 = document.createElement("input");
      input3.type = "text";
      input3.id = "resltlk";
      input3.value = result;
      input3.style.width = "91%";

      input3.addEventListener("focus", function () {
        this.select();
      });
      input3.addEventListener("click", function () {
        this.select();
      });

      form.appendChild(input3);
    });

    document.getElementById("formContainer").appendChild(form);
  }

  var url_string = window.location.href;
  var url = new URL(url_string);
  var q = url.searchParams.get("f");
  var m = url.searchParams.get("m");
  var r = url.searchParams.get("r");
  var tostr = url.searchParams.toString();
  var fullurl = tostr.split("%22");
  var chkfltyp = fullurl[1] ? fullurl[1].split(".pdf") : [];
  if (!q || !m || !r) {
    document.getElementById("status").textContent = "Missing parameter";
    throw new Error("Missing parameter");
  }
  if (r === "true" && chkfltyp[1] === "") {
    $("#crtpdflk,#formContainer").hide();
    var f_urlF = fullurl[1];
    var f_url = unescape(f_urlF.replace(/\+/g, " "));
    var f_meta = m;
    document.title = f_meta + " [ PDF Viewer - MASTROWALL ] ";

    let pdfUrl;
    try {
      pdfUrl = new URL(f_url, location.href).href;
    } catch (e) {
      document.getElementById("status").textContent = "Invalid PDF URL";
      throw e;
    }

    fetch(pdfUrl, { credentials: "same-origin" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.arrayBuffer();
      })
      .then((buf) => {
        const blob = new Blob([buf], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);

        const viewerPath = "/web/viewer.html";
        const iframe = document.getElementById("viewerIframe");
        iframe.src = `${viewerPath}?file=${encodeURIComponent(blobUrl)}`;

        document.getElementById("nocontent").remove();
        document.getElementById("crtpdflk").remove();
      })
      .catch((err) => {
        console.error(err);
        document.getElementById("status").textContent =
          "Failed to fetch PDF: " + err.message;
      });

    document.body.addEventListener("click", function () {
      window.open(f_url, "_blank", "noopener,noreferrer");
    });
  } else {
    document.getElementById("status").textContent = "Failed to fetch PDF";
  }

  setInterval(function () {
    console.clear();
  }, 500);
});

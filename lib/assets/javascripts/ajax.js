if (typeof jQuery === "undefined") {
  jQuery = {};
}

if (!jQuery.ajax) {
  jQuery.ajax = function (params) {
    var csrf_token = document.querySelectorAll("meta[name=csrf-token]").item(0).getAttribute('content');
    
    var xhr = new XMLHttpRequest();
    xhr.open(params.type, params.url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (params.type !== "GET" && params.type !== "HEAD") {
      xhr.setRequestHeader('X-CSRF-Token', csrf_token);
    }
    if (typeof params.contentType !== "undefined") {
      xhr.setRequestHeader("Content-Type", params.contentType);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status < 400) {
          if (typeof params.success === "function") {
            params.success(JSON.parse(xhr.responseText), xhr.status, xhr);
          }
        } else {
          if (typeof params.error === "function") {
            params.error(xhr, "error");
          }
        }
      }
    }
    xhr.send(params.data);
    return xhr;
  }
}


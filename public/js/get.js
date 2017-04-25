/**
 * Created by michogarcia on 25/04/17.
 */

const Get = function (url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(request) {
        if (request.target.readyState != 4 || request.target.status != 200) return;
        cb(request.target.responseText)
    };
    xhr.open('GET', url, true);
    xhr.send();
}
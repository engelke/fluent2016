// Various tools to convert string formats to and from
// byte arrays (that is, Uint8Array), since the Web Crypto
// API likes byte arrays, and web pages like strings.


function arrayBufferToBase64String(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer)
    var byteString = '';

    for (var i=0; i<byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }

    return btoa(byteString);
}


function convertBinaryToPem(binaryData, label) {
    var base64Cert = arrayBufferToBase64String(binaryData);

    var pemCert = "-----BEGIN " + label + "-----\r\n";

    var nextIndex = 0;
    var lineLength;
    while (nextIndex < base64Cert.length) {
        if (nextIndex + 64 <= base64Cert.length) {
            pemCert += base64Cert.substr(nextIndex, 64) + "\r\n";
        } else {
            pemCert += base64Cert.substr(nextIndex) + "\r\n";
        }
        nextIndex += 64;
    }

    pemCert += "-----END " + label + "-----\r\n";
    return pemCert;
}


function byteArrayToHexString(byteArray) {
    var hexString = '';
    var nextHexByte;
    for (var i=0; i<byteArray.byteLength; i++) {
        nextHexByte = byteArray[i].toString(16);    // Integer to base 16
        if (nextHexByte.length < 2) {
            nextHexByte = "0" + nextHexByte;        // Otherwise 10 becomes just a instead of 0a
        }
        hexString += nextHexByte;
    }
    return hexString;
}

function hexStringToByteArray(hexString) {
    if (hexString.length % 2 !== 0) {
        throw "Must have an even number of hex digits to convert to bytes";
    }
    var numBytes = hexString.length / 2;
    var byteArray = new Uint8Array(numBytes);
    for (var i=0; i<numBytes; i++) {
        byteArray[i] = parseInt(hexString.substr(i*2, 2), 16);
    }
    return byteArray;
}

function byteArrayToBase64(byteArray){
    var binaryString = "";
    for (var i=0; i<byteArray.byteLength; i++){
        binaryString += String.fromCharCode(byteArray[i]);
    }
    var base64String = window.btoa(binaryString);
    return base64String;
}

function base64ToByteArray(base64String){
    var binaryString = window.atob(base64String);
    var byteArray = new Uint8Array(binaryString.length);
    for (var i=0; i<binaryString.length; i++){
        byteArray[i] += binaryString.charCodeAt(i);
    }
    return byteArray;
}

function byteArrayToString(byteArray){
    if ("TextDecoder" in window) {
        decoder = new window.TextDecoder;
        return decoder.decode(byteArray);
    }

    // Otherwise, fall back to 7-bit ASCII only
    var result = "";
    for (var i=0; i<byteArray.byteLength; i++){
        result += String.fromCharCode(byteArray[i])
    }
    return result;
}

function stringToByteArray(s){
    if ("TextEncoder" in window) {
       encoder = new window.TextEncoder;
       return encoder.encode(s);
    }

    // Otherwise, fall back to 7-bit ASCII only
    var result = new Uint8Array(s.length);
    for (var i=0; i<s.length; i++){
        result[i] = s.charCodeAt(i);
    }
    return result;
}

// Connects the buttons to appropriate handlers from lab1.js,
// called generateKey, encrypt, and decrypt.

document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    var generateKeyPairButton = document.getElementById("generatekeypair");
    var encryptButton = document.getElementById("encrypt");
    var decryptButton = document.getElementById("decrypt");

    generateKeyPairButton.addEventListener("click", createKeyPair);
    encryptButton.addEventListener("click", encryptFile);
    decryptButton.addEventListener("click", decryptFile);
});

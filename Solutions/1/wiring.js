// Connects the buttons to appropriate handlers from lab1.js,
// called generateKey, encrypt, and decrypt.

document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    var generateButton = document.getElementById("generateKey");
    var encryptButton = document.getElementById("encrypt");
    var decryptButton = document.getElementById("decrypt");

    generateButton.addEventListener("click", generateKey);
    encryptButton.addEventListener("click", encrypt);
    decryptButton.addEventListener("click", decrypt);
});

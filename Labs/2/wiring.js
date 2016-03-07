// Connects the buttons to appropriate handlers from lab1.js,
// called generateKey, encrypt, and decrypt.

document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    var encryptButton = document.getElementById("encrypt");
    var decryptButton = document.getElementById("decrypt");

    encryptButton.addEventListener("click", encryptFile);
    decryptButton.addEventListener("click", decryptFile);
});

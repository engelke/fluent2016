// Connects the buttons to appropriate handlers from lab1.js,
// called generateKey, encrypt, and decrypt.

document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    var generateKeyPairButton = document.getElementById("generatekeypair");
    var signButton = document.getElementById("sign");
    var verifyButton = document.getElementById("verify");

    generateKeyPairButton.addEventListener("click", createKeyPair);
    signButton.addEventListener("click", signFile);
    verifyButton.addEventListener("click", verifySignature);
});

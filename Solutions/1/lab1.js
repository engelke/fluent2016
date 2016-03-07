// Cryptographic functionality for lab 1


// When GenerateKey button is clicked, create a new AES-CBC
// 256 bit key, export it, and put a hex encoding of it in
// the Key input field.
function generateKey() {
    // Create a CryptoKey
    window.crypto.subtle.generateKey(
        {name: "AES-CBC", length: 256},
        true,
        ["encrypt", "decrypt"]
    ).then(function(key){
        // Export to ArrayBuffer
        return window.crypto.subtle.exportKey(
            "raw",
            key
        );
    }).then(function(buf){
        // Cast to a byte array, place in Key field
        var byteArray = new Uint8Array(buf);
        var keyField = document.getElementById("key");
        keyField.value = byteArrayToHexString(byteArray);
    }).catch(function(err){
        // Nothing should go wrong... but it might!
        alert("Key generation error: " + err.message);
    });
}


// When the Encrypt button is pressed, create a CryptoKey
// object from the hex encoded data in the Key input field,
// then use that key to encrypt the plaintext. Hex encode the
// random IV used and place in the IV field, and base 64 encode
// the ciphertext and place in the Ciphertext field.
function encrypt() {
    // Start by getting Key and Plaintext into byte arrays
    var keyField = document.getElementById("key");
    var hexString = keyField.value;
    var keyBytes = hexStringToByteArray(hexString);

    var plaintextField = document.getElementById("plaintext");
    var plaintext = plaintextField.value;
    var plaintextBytes = stringToByteArray(plaintext);

    // Make a CryptoKey from the Key string
    window.crypto.subtle.importKey(
        "raw",
        keyBytes,
        {name: "AES-CBC", length: 256},
        false,
        ["encrypt"]
    ).then(function(key){
        // Get a random IV, put in IV field, too
        var iv = window.crypto.getRandomValues(new Uint8Array(16));
        var ivField = document.getElementById("iv");
        var ivHexString = byteArrayToHexString(iv);
        ivField.value = ivHexString;

        // Use the CryptoKey to encrypt the plaintext
        return window.crypto.subtle.encrypt(
            {name: "AES-CBC", iv: iv},
            key,
            plaintextBytes
        );
    }).then(function(ciphertextBuf){
        // Encode ciphertext to base 64 and put in Ciphertext field
        ciphertextBytes = new Uint8Array(ciphertextBuf);
        base64Ciphertext = byteArrayToBase64(ciphertextBytes);
        ciphertextField = document.getElementById("ciphertext");
        ciphertextField.value = base64Ciphertext;
    }).catch(function(err){
        alert("Encryption error: " + err.message);
    });
}


// When the Decrypt button is pressed, create a CryptoKey
// object from the hex encoded data in the Key input field,
// decode the hex IV field value to a byte array, decode
// the base 64 encoded ciphertext to a byte array, and then
// use that IV and key to decrypt the ciphertext. Place the
// resulting plaintext in the plaintext field.
function decrypt() {
    // Start by getting Key, IV, and Ciphertext into byte arrays
    var keyField = document.getElementById("key");
    var keyHexString = keyField.value;
    var keyBytes = hexStringToByteArray(keyHexString);

    var ivField = document.getElementById("iv");
    var ivHexString = ivField.value;
    var ivBytes = hexStringToByteArray(ivHexString);

    var ciphertextField = document.getElementById("ciphertext");
    var ciphertextBase64String = ciphertextField.value;
    var ciphertextBytes = base64ToByteArray(ciphertextBase64String);

    // Make a CryptoKey from the Key string
    window.crypto.subtle.importKey(
        "raw",
        keyBytes,
        {name: "AES-CBC", length: 256},
        false,
        ["decrypt"]
    ).then(function(key){
        // Use the CryptoKey and IV to decrypt the plaintext
        return window.crypto.subtle.decrypt(
            {name: "AES-CBC", iv: ivBytes},
            key,
            ciphertextBytes
        );
    }).then(function(plaintextBuf){
        // Convert array buffer to string and put in Plaintext field
        plaintextBytes = new Uint8Array(plaintextBuf);
        plaintextString = byteArrayToString(plaintextBytes);
        plaintextField = document.getElementById("plaintext");
        plaintextField.value = plaintextString;
    }).catch(function(err){
        alert("Encryption error: " + err.message);
    });
}

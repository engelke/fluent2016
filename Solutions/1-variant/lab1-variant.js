// Cryptographic functionality for lab 1


// When GenerateKey button is clicked, create a new AES-CBC
// 256 bit key, export it, and put a hex encoding of it in
// the Key input field.
function generateKey() {
    // Create a CryptoKey
    var genOp = window.msCrypto.subtle.generateKey(
        {name: "AES-CBC", length: 256},
        true,
        ["encrypt", "decrypt"]
    );

    genOp.oncomplete = function(evt){
        // Export to ArrayBuffer
        var key = evt.target.result;
        var expOp = window.msCrypto.subtle.exportKey(
            "raw",
            key
        );

        expOp.oncomplete = function(evt){
        // Cast to a byte array, place in Key field
            var buf = evt.target.result;
            var byteArray = new Uint8Array(buf);
            var keyField = document.getElementById("key");
            keyField.value = byteArrayToHexString(byteArray);
        }

        expOp.onerror = function(evt) {
            var err = evt.target.result;
            alert("Error exporting key: " + err.message);
        }
    }

    genOp.onerror = function(evt){
        // Nothing should go wrong... but it might!
        var err = evt.target.result;
        alert("Key generation error: " + err.message);
    }
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
    var impOp = window.msCrypto.subtle.importKey(
        "raw",
        keyBytes,
        {name: "AES-CBC", length: 256},
        false,
        ["encrypt"]
    );

    impOp.onerror = function(evt){
        var err = evt.target.result;
        alert("Error importing key: " + err.message);
    }

    impOp.oncomplete = function(evt){
        // Get a random IV, put in IV field, too
        var key = evt.target.result;
        var iv = window.msCrypto.getRandomValues(new Uint8Array(16));
        var ivField = document.getElementById("iv");
        var ivHexString = byteArrayToHexString(iv);
        ivField.value = ivHexString;

        // Use the CryptoKey to encrypt the plaintext
        var encOp = window.msCrypto.subtle.encrypt(
            {name: "AES-CBC", iv: iv},
            key,
            plaintextBytes
        );

        encOp.onerror = function(evt){
            var err = evt.target.result;
            alert("Error encrypting plaintext: " + err.message);
        }

        encOp.oncomplete = function(evt){
            // Encode ciphertext to base 64 and put in Ciphertext field
            var ciphertextBuf = evt.target.result;
            ciphertextBytes = new Uint8Array(ciphertextBuf);
            base64Ciphertext = byteArrayToBase64(ciphertextBytes);
            ciphertextField = document.getElementById("ciphertext");
            ciphertextField.value = base64Ciphertext;
        }
    }
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
    var impOp = window.msCrypto.subtle.importKey(
        "raw",
        keyBytes,
        {name: "AES-CBC", length: 256},
        false,
        ["decrypt"]
    );

    impOp.onerror = function(evt){
        var err = evt.target.result;
        alert("Error importing key: " + err.message);
    }

    impOp.oncomplete = function(evt){
        // Use the CryptoKey and IV to decrypt the plaintext
        var key = evt.target.result;
        var decOp = window.msCrypto.subtle.decrypt(
            {name: "AES-CBC", iv: ivBytes},
            key,
            ciphertextBytes
        );

        decOp.onerror = function(evt){
            var err = evt.target.result;
            alert("Error decrypting ciphertext: " + err.message);
        }

        decOp.oncomplete = function(evt){
            // Convert array buffer to string and put in Plaintext field
            var plaintextBuf = evt.target.result;
            plaintextBytes = new Uint8Array(plaintextBuf);
            plaintextString = byteArrayToString(plaintextBytes);
            plaintextField = document.getElementById("plaintext");
            plaintextField.value = plaintextString;
        }
    }
}

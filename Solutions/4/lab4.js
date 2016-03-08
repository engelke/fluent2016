// Cryptographic functionality for lab 4


// When the Generate Key Pair button is clicked, generate a
// random RSA-OAEP key pair. Export the public and
// private keys (using "spki" and "pkcs8" formats), and put
// the base 64 encoding of those values in the appropriate
// boxes.
function createKeyPair() {
    window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]), // 65537
            hash: {name: "SHA-256"}
        },
        true,
        ["encrypt", "decrypt"]
    ).then(function(keyPair) {
        // Export the public key portion
        window.crypto.subtle.exportKey("spki", keyPair.publicKey
        ).then(function(spkiBuffer) {
            var spkiBytes = new Uint8Array(spkiBuffer);
            var spkiString = byteArrayToBase64(spkiBytes);
            var spkiBox = document.getElementById("publickey");
            spkiBox.value = spkiString;
        }).catch(function(err) {
            alert("Could not export public key: " + err.message);
        });

        // Export the private key part, in parallel to the public key
        window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey
        ).then(function(pkcs8Buffer) {
            var pkcs8Bytes = new Uint8Array(pkcs8Buffer);
            var pkcs8String = byteArrayToBase64(pkcs8Bytes);
            var pkcs8Box = document.getElementById("privatekey");
            pkcs8Box.value = pkcs8String;
        }).catch(function(err) {
            alert("Could not export private key: " + err.message);
        });

    }).catch(function(err) {
        alert("Could not generate key pair: " + err.message);
    });
}

// When the Encrypt button is clicked, import the public key to
// a CryptoKey object, create a random AES-CBC key, export it,
// then encrypt it and put the base 64 encoding of it in the correct
// text box. Now read the file, encrypt it with the AES-CBC key,
// and return it to the user in the same as in Lab 2.
function encryptFile() {
    var spkiBox = document.getElementById("publickey");
    var spkiString = spkiBox.value;
    var spkiBytes = base64ToByteArray(spkiString);

    // Start by getting the RSA public key for encrypting session key
    window.crypto.subtle.importKey(
        "spki",
        spkiBytes,
        {name: "RSA-OAEP", hash: "SHA-256"},
        false,
        ["encrypt"]
    ).then(function(publicKey) {
        // Now we need to create a random session key for encrypting
        // the actual plaintext.
        return window.crypto.subtle.generateKey(
            {name: "AES-CBC", length: 256},
            true,
            ["encrypt", "decrypt"]
        ).then(function(sessionKey) {
            // We need to do two things with the session key:
            //    Use it to encrypt the selected plaintext file
            //    Encrypt the session key with the public key

            // Part 1 - Read the file and encrypt it with the session key.
            var file = document.getElementById("datafile").files[0];
            var reader = new FileReader;
            reader.onload = encryptReadFile;    // See definition below
            reader.readAsArrayBuffer(file);

            function encryptReadFile() {
                var ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
                var plaintextBytes = new Uint8Array(reader.result);

                window.crypto.subtle.encrypt(
                    {name: "AES-CBC", iv: ivBytes}, sessionKey, plaintextBytes
                ).then(function(ciphertextBuffer) {
                    // Build a Blob with the 16-byte IV followed by the ciphertext
                    var blob = new Blob(
                        [ivBytes, new Uint8Array(ciphertextBuffer)],
                        {type: "application/octet-stream"}
                    );
                    var blobUrl = URL.createObjectURL(blob);
                    window.location = blobUrl;
                }).catch(function(err) {
                    alert("Could not encrypt the plaintext: " + err.message);
                });
            }

            // Part 2 - encrypt the session key with the public key. This
            //          requires exporting it first.
            window.crypto.subtle.exportKey(
                "raw", sessionKey
            ).then(function(sessionKeyBuffer) {
                // Encrypt the session key in the buffer, save the encrypted
                // key in the keyBox element.
                window.crypto.subtle.encrypt(
                    {name: "RSA-OAEP"},
                    publicKey,  // from closure
                    sessionKeyBuffer
                ).then(function(encryptedSessionKeyBuffer) {
                    var encryptedSessionKeyBytes = new Uint8Array(encryptedSessionKeyBuffer);
                    var encryptedSessionKeyBase64 = byteArrayToBase64(encryptedSessionKeyBytes);
                    var keyBox = document.getElementById("sessionkey");
                    keyBox.value = encryptedSessionKeyBase64;
                }).catch(function(err) {
                    alert("Could not encrypt session key.")
                });
            }).catch(function(err) {
                alert("Could not export random session key:" + err.message);
            });

        }).catch(function(err) {
            alert("Could not generate random session key: " + err.message);
        });
    }).catch(function(err) {
        alert("Could not import public key: " + err.message);
    });
}


// When the Decrypt button is clicked, import the private key to
// a CryptoKey object and use it to decrypt the session key. Then
// import the session key and use it to decrypt the ciphertext when
// it is read from the selected file.
function decryptFile() {
    var pkcs8Box = document.getElementById("privatekey");
    var pkcs8String = pkcs8Box.value;
    var pkcs8Bytes = base64ToByteArray(pkcs8String);

    // We need a CryptoKey object holding the private key to get started
    window.crypto.subtle.importKey(
        "pkcs8",
        pkcs8Bytes,
        {name: "RSA-OAEP", hash: "SHA-256"},
        false,
        ["decrypt"]
    ).then(function(privateKey) {
        // Now use the private key to decrypt the session key
        var keyBox = document.getElementById("sessionkey");
        var encryptedSessionKeyBase64 = keyBox.value;
        var encryptedSessionKeyBytes = base64ToByteArray(encryptedSessionKeyBase64);

        window.crypto.subtle.decrypt(
            {name: "RSA-OAEP"}, privateKey, encryptedSessionKeyBytes
        ).then(function(sessionKeyBuffer){
            window.crypto.subtle.importKey(
                // We can't use the session key until it is in a CryptoKey object
                "raw", sessionKeyBuffer, {name: "AES-CBC", length: 256}, false, ["decrypt"]
            ).then(function(sessionKey){
                // Finally, we can read and decrypt the ciphertext file
                var file = document.getElementById("datafile").files[0];
                var reader = new FileReader;

                reader.onload = function() {
                    var ivBytes = new Uint8Array(reader.result.slice(0, 16));
                    var ciphertextBytes = new Uint8Array(reader.result.slice(16));

                    window.crypto.subtle.decrypt(
                        {name: "AES-CBC", iv: ivBytes}, sessionKey, ciphertextBytes
                    ).then(function(plaintextBuffer) {
                        var blob = new Blob(
                            [new Uint8Array(plaintextBuffer)],
                            {type: "application/octet-stream"}
                        );
                        var blobUrl = URL.createObjectURL(blob);
                        window.location = blobUrl;
                    }).catch(function(err) {
                        alert("Could not decrypt the ciphertext: " + err.message);
                    });
                }

                reader.readAsArrayBuffer(file);

            }).catch(function(err){
                alert("Error importing session key: " + err.message);
            });
        }).catch(function(err){
            alert("Error decrypting session key: " + err.message);
        });
    }).catch(function(err) {
        alert("Could not import private key: " + err.message)
    });
}

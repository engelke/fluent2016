// Cryptographic functionality for lab 3


// When the Generate Key Pair button is clicked, generate a
// random RSASSA-PKCS1-v1_5 key pair. Export the public and
// private keys (using "spki" and "pkcs8" formats), and put
// the base 64 encoding of those values in the appropriate
// boxes.
function createKeyPair() {
    window.crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]), // 65537
            hash: {name: "SHA-256"}
        },
        true,
        ["sign", "verify"]
    ).then(function(keyPair) {

        window.crypto.subtle.exportKey("spki", keyPair.publicKey
        ).then(function(spkiBuffer) {
            var spkiBytes = new Uint8Array(spkiBuffer);
            var spkiString = byteArrayToBase64(spkiBytes);
            var spkiBox = document.getElementById("publickey");
            spkiBox.value = spkiString;
        }).catch(function(err) {
            alert("Could not export public key: " + err.message);
        });

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

// When the Sign button is clicked, import the private key to
// a CryptoKey object, read the selected file, produce a
// signature, and put the base 64 encoded signature into the
// appropriate box.
function signFile() {
    var pkcs8Box = document.getElementById("privatekey");
    var pkcs8String = pkcs8Box.value;
    var pkcs8Bytes = base64ToByteArray(pkcs8String);

    window.crypto.subtle.importKey(
        "pkcs8",
        pkcs8Bytes,
        {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"},
        false,
        ["sign"]
    ).then(function(privateKey) {
        var file = document.getElementById("datafile").files[0];
        var reader = new FileReader;

        reader.onload = function() {
            var documentBytes = new Uint8Array(reader.result);
            window.crypto.subtle.sign(
                {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"},
                privateKey,
                documentBytes
            ).then(function(signatureBuffer) {
                var signatureBytes = new Uint8Array(signatureBuffer);
                var signatureBase64 = byteArrayToBase64(signatureBytes);
                var signatureBox = document.getElementById("signature");
                signatureBox.value = signatureBase64;
            }).catch(function(err) {
                alert("Could not sign the file: " + err.message);
            });
        }

        reader.readAsArrayBuffer(file);
    }).catch(function(err) {
        alert("Could not import private key: " + err.message)
    });
}

// When the Verify button is clicked, import the public key to
// a CryptoKey object, read the selected file, get the signature
// from the base 64 encoded string in the signature box, and
// then verify the signature. Use an alert to tell whether it's
// a good signature or not.
function verifySignature() {
    var spkiBox = document.getElementById("publickey");
    var spkiString = spkiBox.value;
    var spkiBytes = base64ToByteArray(spkiString);

    var signatureBox = document.getElementById("signature");
    var signatureString = signatureBox.value;
    var signatureBytes = base64ToByteArray(signatureString);

    window.crypto.subtle.importKey(
        "spki",
        spkiBytes,
        {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"},
        false,
        ["verify"]
    ).then(function(publicKey) {
        var file = document.getElementById("datafile").files[0];
        var reader = new FileReader;

        reader.onload = function() {
            var documentBytes = new Uint8Array(reader.result);
            window.crypto.subtle.verify(
                {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"},
                publicKey,
                signatureBytes,
                documentBytes
            ).then(function(validSignature) {
                if (validSignature) {
                    alert("Signature is good.");
                } else {
                    alert("Signature is NOT valid!");
                }
            }).catch(function(err) {
                alert("Could not verify the file as valid or not: " + err.message);
            });
        }

        reader.readAsArrayBuffer(file);
    }).catch(function(err) {
        alert("Could not import public key: " + err.message)
    });
}

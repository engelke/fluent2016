// Cryptographic functionality for lab 2


// When the Encrypt button is clicked, derive a 256-bit AES-CBC
// key from the entered pass phrase, then read the selected file
// using FileReader.readAsArrayBuffer. On completed read, encrypt
// the file using the key, build a Blob out of the IV plus the
// resulting ciphertext, then change the window.location to a
// URL representing the Blob.
function encryptFile() {
    // Replace the following alert with code to derive and use a key
    alert("Clicked the Encrypt button.");
}

// When the Decrypt button is clicked, derive a 256-bit AES-CBC
// key from the entered pass phrase, then read the selected file
// using FileReader.readAsArrayBuffer. On completed read, decrypt
// the file using the key and the IV in its first 16 bytes. Finally,
// build a Blob out of the resulting plaintext, then change the
// window.location to a URL representing the Blob.
function decryptFile() {
    // Replace the following alert with code to derive and use a key
    alert("Clicked the Decrypt button.");
}


// Hints:
//
// SubtleCrypto methods:
//
// window.crypto.subtle.deriveKey(derivationAlgorithm, baseKey, targetAlgorithm, exportable, usages)
//  - returns a Promise that yields the CryptoKey created
//  - derivationAlgorithm is the algorithm used for the derivation, with properties
//    - name is PBKDF2
//    - salt is an ArrayBuffer with a known value
//    - iterations is an integer telling how many rounds to perform
//    - hash is the hash function used by the derivation algorith, SHA-1 here
//  - baseKey is a CryptoKey representing the password
//  - targetAlgorithm is what the resulting key will be used for
//    - name is AES-CBC, length is 256
//  - extractable is a boolean.
//  - usages is ["encrypt", "decrypt"]
//
// window.crypto.subtle.importKey(keyFormat, keyBytes, algorithm, exportable, usages)
// - returns a Promise yielding the CryptoKey
// - keyFormat, algorithm, exportable, usages same as in above methods
// - keyBytes is an ArrayBuffer or byte array with key value
//
// window.crypto.subtle.encrypt(algorithm, key, plaintext)
// - returns a Promise yielding an ArrayBuffer containing the ciphertext
// - algorithm object has name and iv properties
//   - name same as used for generateKey and importKey
//   - iv is 16 bytes of random data, needed to maintain security
//   - iv is not secret
// - plaintext is an ArrayBuffer or byte array
//
// window.crypto.subtle.decrypt(algorithm, key, ciphertext)
// - returns a Promise yielding an ArrayBuffer containing the plaintext
// - algorithm object has name and iv properties
//   - name same as used for generateKey and importKey
//   - iv must be the same 16 bytes used when encrypting
// - ciphertext is an ArrayBuffer or byte array

//
// Read the selected file using FileReader.readAsArrayBuffer:
//
//    var file = document.getElementById("datafile").files[0];
//    var reader = new FileReader();
//    reader.onload = function() {
//        handle the result, an ArrayBuffer named reader.result
//    }
//    reader.readAsArrayBuffer(file);
//
// Return the contents of an ArrayBuffer using a Blob:
//
//    var blob = new Blob([listOfBuffersOrViews], {type: "application/octet-stream"});
//    var url = URL.createObjectURL(blob);
//    window.location = url;

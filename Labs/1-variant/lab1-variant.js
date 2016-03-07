// Cryptographic functionality for lab 1


// When GenerateKey button is clicked, create a new AES-CBC
// 256 bit key, export it, and put a hex encoding of it in
// the Key input field.
function generateKey() {
    // Replace this alert with your solution
    window.alert("GenerateKey clicked.");
}


// When the Encrypt button is pressed, create a CryptoKey
// object from the hex encoded data in the Key input field,
// then use that key to encrypt the plaintext. Hex encode the
// random IV used and place in the IV field, and base 64 encode
// the ciphertext and place in the Ciphertext field.
function encrypt() {
    // Replace this alert with your solution
    window.alert("Encrypt clicked.");
}


// When the Decrypt button is pressed, create a CryptoKey
// object from the hex encoded data in the Key input field,
// decode the hex IV field value to a byte array, decode
// the base 64 encoded ciphertext to a byte array, and then
// use that IV and key to decrypt the ciphertext. Place the
// resulting plaintext in the plaintext field.
function decrypt() {
    // Replace this alert with your solution
    window.alert("Decrypt clicked.");
}


// Hints:
//
// SubtleCrypto methods:
//
// window.crypto.subtle.generateKey(algorithm, extractable, usages)
//  - returns a Promise that yields the CryptoKey created
//  - algorithm is an object with a name property, possibly others
//    - name is a registered algorithm name (see spec)
//    - AES-CBC is the name to use here
//    - that algorithm requires a second property: length
//    - use 256 (bits) as the length
//  - extractable is a boolean. Can the key value be exported?
//  - usages is an array of strings. See specs for values in general
//    - ["encrypt", "decrypt"] here.
//
// window.crypto.subtle.exportKey(keyFormat, cryptoKey)
// - returns a Promise yielding an ArrayBuffer with key bytes
// - keyFormat is one of four strings
//   - "raw" for secret keys
//   - "spki" for public keys
//   - "pkcs8" for private keys
//   - "jwk" for any kind of key
// - cryptoKey is the key to export
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

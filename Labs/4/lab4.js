// Cryptographic functionality for lab 4


// When the Generate Key Pair button is clicked, generate a
// random RSA-OAEP key pair. Export the public and
// private keys (using "spki" and "pkcs8" formats), and put
// the base 64 encoding of those values in the appropriate
// boxes.
function createKeyPair() {
    // Replace this alert with the correct code
    alert("Clicked the Generate Key Pair button.");
}

// When the Encrypt button is clicked, import the public key to
// a CryptoKey object, create a random AES-CBC key, export it,
// then encrypt it and put the base 64 encoding of it in the correct
// text box. Now read the file, encrypt it with the AES-CBC key,
// and return it to the user in the same as in Lab 2.
function encryptFile() {
    // Replace this alert with the correct code
    alert("Clicked the Encrypt button.");
}


// When the Decrypt button is clicked, import the private key to
// a CryptoKey object and use it to decrypt the session key. Then
// import the session key and use it to decrypt the ciphertext when
// it is read from the selected file.
function decryptFile() {
    // Replace this alert with the correct code
    alert("Clicked the Decrypt button.");
}



// Hints:
//
// This is a very long exercise, and is complicated by the fact
// that there can be multiple asynchronous operations that can
// happen in parallel.
//
// For encryption and decryption, get a sessionKey CryptoKey
// object before trying to read the file. Then, while the file
// read is complete, you will already have the needed key to
// encrypt or decrypt it.
//
// - Algorithm identifiers
//   - name: RSA-OAEP
//   - modulusLength: 2048
//   - publicExponent: new Uint8Array([1,0,1])
//   - hash: SHA-256

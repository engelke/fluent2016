Lab 4 - Public Key Encryption
-----------------------------

We're back to protecting secrets, but with asymmetric
cryptography this time. There is a lot of similarity with
Digital Signatures here, but the mechanics are more
involved. That's because the RSASSA-PKCS1-v1_5 algorithm
we used for signing can sign any data buffer. But the
similar RSA-OAEP algorithm we need to use for encryption
can only encrypt a quite small amount of data.

The solution requires creating a random AES-CBC
key and using it to encrypt the plaintext, and then using
RSA-OAEP only to encrypt that AES key (which is small).
That (RSA) encrypted key needs to be bundled with the
(AES) encrypted ciphertext for future decryption.

The needed steps are similar to those for Lab 3 - Digital
Signatures. Create an RSA key pair (though for RSA-OAEP instead
of RSASSA-PKCS1-v1_5), encrypt a file, and decrypt that file.

1 - Creating the key pair

Create the key pair when the user clicks Generate Key Pair,
then export both the public and private keys (to "spki" and
"pkcs8" format, respectively), putting the base 64 encoding
in the appropriate text boxes

2 - Encrypt a file

Create and export a random AES-CBC key, then import the public
key from the appropriate text box and use it to encrypt the AES
key. Then read the file and encrypt it using the AES key. Put
the encrypted AES key in the appropriate text box, and return
the ciphertext file to the user.

3 - Decrypt a file

Import the private key from the appropriate text box, get the
encrypted AES key from the text box, and decrypt the AES key
using the private key. Then read the ciphertext file.
Import the AES key and use it to decrypt the ciphertext. Return
the resulting plaintext to the user.

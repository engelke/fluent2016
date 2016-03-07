Lab 1 - Symmetric Encryption
----------------------------

This is just about the smallest possible cryptographic example
using the Web Cryptography API.

You will generate and display a random 256-bit AES key, then
use it to encrypt plaintext entered by the user. After
encryption, you will display the ciphertext (base 64 encoded
for display) and the random IV you had to create (hex encoded
for display).

Given the ciphertext, key, and IV, you will decrypt the message
and display it to the user.

The algorithm used here will be AES-CBC because it is widely
supported by browsers and by non-browser cryptographic
libraries.

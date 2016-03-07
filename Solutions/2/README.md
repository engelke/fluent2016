Lab 2 - Password-based Key Derivation
-------------------------------------

This lab is a refinement of Lab 1 - Symmetric Encryption in
three ways: instead of creating a random AES key, it creates one
from a user-entered password (or, better, pass phrase); instead
of displaying the IV as a separate data element, it will
simply prepend it to the ciphertext; and instead of working
with text entered on the page, it will work with files.

You will derive a 256-bit AES key from a user-entered value,
create a random IV, and then use them to encrypt plaintext in
a file selected by the user. After encryption, you will display
a link to download the IV and concatenated ciphertext to
a local file.

Conversely, the user may enter a phrase and select a file
containing ciphertext (with a leading IV value) and decrypt
the file to get the original plaintext.

The algorithms used here will be PBKDF2 with SHA-1, and 256-bit
AES-CBC because they are widely supported by browsers and
by non-browser cryptographic libraries.

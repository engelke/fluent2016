Lab 3 - Digital Signatures
--------------------------

Now for something different. Instead of protecting a secret,
this lab is for authenticating a file and preventing it from
being altered without detection. This is done with a digital
signature.

The API's sign and verify methods produce or check a digital
signature for a file. There are several possible algorithms
that can be used for signing (AES-CMAC, HMAC, RSA-PKCS1-v1_5,
RSA-PSS, ECDSA); this lab will use RSA-PKCS1-v1_5, because
it is widely supported by cryptographic libraries, and uses
asymmetric cryptography instead of symmetric cryptography,
so different keys are used for signing and verifying.

There are separate steps that need to be performed: creating an
RSA key pair, and actually signing a file or verifying a
signed file:

1 - Creating the key pair

Create the key pair when the user clicks Generate Key Pair,
then export both the public and private keys (to "spki" and
"pkcs8" format, respectively), putting the base 64 encoding
in the appropriate text boxes

2 - Signing a file

Import the private key from the appropriate text box, then
read the file and produce a digital signature. Base 64 encode
that and put in the appropriate box.

3 - Verifying a signed file

Import the public key from the appropriate text box, get
the digital signature from its box, read the file, and
verify the signature. Use an alert box to indicate
whether it is a valid signature or not.

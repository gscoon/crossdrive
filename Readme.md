Functionality
    - Connect to multiple cloud storage providers
    - Pull file(s) from a directory
    - Upload file(s) from a directory
    - Encrypt and decrypt files using OpenPGP
    - Authenticate a person?


Difficulty
    - Each app needs API keys from provider
    - Each user has to `authorize` use that app

    - Multiple users?


Token file structure (Assume 1 user)
```js
{
    googledrive : "",
    dropbox     : "",
    box         : ""
}
```

Flow
    1. Set provider credentials
    2. Check if user token already exists
    3. If not, use provider credentials to request anotehr

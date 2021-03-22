// post-install.js

/**
 * Script to run after npm install
 *
 * Copie les fichiers necessaires dans le src du client
 */

'use strict'

const gentlyCopy = require('gently-copy');

let filesToCopy = [
    '_user-src/json-db-ui',
    '_user-src/jsonDb.config.js'
]

// User's local directory
let userPath = process.env.INIT_CWD

// Moving files to user's local directory
gentlyCopy(filesToCopy, userPath+"/src/ee09/")
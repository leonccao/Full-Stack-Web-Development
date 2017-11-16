// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "Your API Key",
    authDomain: "Your Auth Domain",
    databaseURL: "Your Database URL",
    projectId: "Your Project ID",
    storageBucket: "Your Storage Bucket",
    messagingSenderId: "Your Messaging Sender ID"
  }
};

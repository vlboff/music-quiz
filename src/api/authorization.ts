

// const clientId = 'a2d1920952a842d7b6a51caa84cc97f2';
// const redirectUri = 'http://localhost:5173/';
// const urlParams = new URLSearchParams(window.location.search);
// const code = urlParams.get('code');






// export function auth(codeChallenge: string, codeVerifier: string) {
//   const state = generateRandomString(16);
//   const scope = 'user-read-private user-read-email';

//   sessionStorage.setItem('code_verifier', codeVerifier);

//   const args = new URLSearchParams({
//     response_type: 'code',
//     client_id: clientId,
//     scope: scope,
//     redirect_uri: redirectUri,
//     state: state,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge
//   });

//   const authorizationUrl = 'https://accounts.spotify.com/authorize?' + args;
//   window.location.assign(authorizationUrl);
//   accessToken();
//   console.log(codeVerifier);
// }



// export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
//   function base64encode(string: ArrayBuffer): string {
//     return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(string))))
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_')
//       .replace(/=+$/, '');
//   }

//   const encoder = new TextEncoder();
//   const data = encoder.encode(codeVerifier);
//   const digest: ArrayBuffer = await window.crypto.subtle.digest('SHA-256', data);

//   return base64encode(digest);
// }

// export function generateRandomString(length: number) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }


// export async function accessToken() {
//   const codeVerifier = sessionStorage.getItem('code_verifier');

//   const body = new URLSearchParams({
//     grant_type: 'authorization_code',
//     code: code!,
//     redirect_uri: redirectUri,
//     client_id: clientId,
//     code_verifier: codeVerifier!
//   });

//   fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: body
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('HTTP status ' + response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       sessionStorage.setItem('access_token', data.access_token);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
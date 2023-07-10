import './Auth.scss'
import Button from '@mui/material/Button';
import { generateCodeChallenge, generateRandomString, auth } from "../../api/authorization";

const codeVerifier = generateRandomString(128);

export default function Auth() {
  return (
    <div className="auth">
      <Button variant="contained" onClick={() => { generateCodeChallenge(codeVerifier).then(codeChallenge => auth(codeChallenge, codeVerifier)) }}>login</Button>
    </div>
  )
}

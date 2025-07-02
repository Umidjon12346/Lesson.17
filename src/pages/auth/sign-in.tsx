import { useState } from "react"
import { authService } from "../../service/auth.service"

function signIn() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const submit = ()=>{
        const payload ={email,password}
        authService.signIn(payload)
    }
  return (
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="asdasdas"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="sadasd"
      />
      <button onClick={submit}>submit</button>
    </div>
  );
}

export default signIn
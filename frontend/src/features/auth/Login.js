import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
        if (!err.status) {
          setErrMsg('No server response')
        } else if (err.status === 400) {
          setErrMsg('Missing username and/or password')
        } else if (err.status == 401) {
          setErrMsg('Not authorized')
        } else {
          setErrMsg(err.data?.message)
        }
        errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading...</p>

  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p className={errClass} ref={errRef} aria-live="assertive">{errMsg}</p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input className="form__input" type="text" id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required />
          <label htmlFor="password">Username:</label>
          <input className="form__input" type="password" id="password" value={password} onChange={handlePwdInput} required />
          <button className="form__submit-button">Sign In</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  )

  return content
}

export default Login
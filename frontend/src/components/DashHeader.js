import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faFileCirclePlus, faFilePen, faUserGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const DashHeader = () => {

  const { isManager, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [sendLogout, {isLoading, isSuccess, isError, error }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const onNewNoteClicked = () => navigate('dash/notes/new')
  const onNewUserClicked = () => navigate('dash/users/new')
  const onNotesClicked = () => navigate('dash/notes')
  const onUsersClicked = () => navigate('dash/users')
 
  if (isLoading) return <p>Logging out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout} >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p className='logout-text'>logout</p>
    </button>
    
  )

  const content = (
      <header className="dash-header">
          <div className={`dash-header__container ${dashClass}`}>
              <Link to="/dash">
                <h1 className="dash-header__title">ticketingApp</h1>
              </Link>
                <nav className="dash-header__nav">
                  {logoutButton}
                </nav>
          </div>
      </header>
  )

    return content
}
export default DashHeader
import medSyncLogo from '../../assets/images/landing-page/medsync-logo.svg'
// import medSyncLogo from '../assets/images/landing-page/medsync-logo.svg'
const HomePage = ({ user }) => {
  console.log(11, 'user', user)
  return (
    <div>
      <div className="landing-page">
        <h1>Welcome to Telegram Mini App</h1>
        <div className="landing-page__logo">
          <img className="logo" src={medSyncLogo} alt="MedSync Logo" />
        </div>
        {user && (
          <div>
            <h2>Hello, {user?.username}</h2>
            <p>Telegram ID: {user?.telegramId}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage

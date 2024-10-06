import logo from '../assets/images/landing-page/medsync-logo.svg'
import { useCloudStorage } from '@vkruglikov/react-telegram-web-app'
import { useEffect } from 'react'
import storage from '../utils/localStorage.js'
import { useNavigate } from 'react-router-dom'

function RegistrationConfirmation() {
  // const storage = useCloudStorage()
  const navigate = useNavigate()
  window.Telegram.WebApp.disableClosingConfirmation()

  useEffect(() => {
    storage.removeItem('selectedDoctor')
    storage.removeItem('selectedDiagnostic')
    storage.removeItem('selectedLocation')
    storage.removeItem('selectedTimeSlot')
  }, [])

  return (
    <div className="registration-confirmation">
      <img className="logo" src={logo} alt="MedSync logo" />
      <p className="registration-confirmation__title">Успешный</p>
      <p className="registration-confirmation__text">
        Вы успешно записались на прием в MedSync..
        <br />
        <br />
        Вы можете закрыть сейчас или записаться на другую встречу!
      </p>
      <div
        className="button arrow-button"
        onClick={() => {
          window.Telegram.WebApp.close()
        }}
      >
        Close
      </div>
      <button
        className="button button-second"
        onClick={async () => {
          navigate(`/`)
        }}
      >
        Запишитесь на другую встречу
      </button>
      {/* <a href="/" className="button button-second">
        Book another Appointment
      </a> */}
    </div>
  )
}

export default RegistrationConfirmation

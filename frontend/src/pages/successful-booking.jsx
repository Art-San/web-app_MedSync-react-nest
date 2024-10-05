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
      <p className="registration-confirmation__title">Successful</p>
      <p className="registration-confirmation__text">
        You have successfully booked your appointment with MedSync.
        <br />
        <br />
        You can close now or book another appointment!
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
        Book another Appointment
      </button>
      {/* <a href="/" className="button button-second">
        Book another Appointment
      </a> */}
    </div>
  )
}

export default RegistrationConfirmation

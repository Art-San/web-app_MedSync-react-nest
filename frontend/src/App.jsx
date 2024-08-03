import { useEffect, useState } from 'react'
import axios from 'axios'
import medSyncLogo from './assets/images/landing-page/medsync-logo.svg'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const tg = window.Telegram.WebApp
    tg.ready()

    // const userData = {
    //   queryId: tg.initDataUnsafe?.query_id,
    //   username: tg.initDataUnsafe?.user?.username,
    //   telegramId: tg.initDataUnsafe?.user?.id,
    //   authDate: tg.initDataUnsafe?.auth_date,
    //   hash: tg.initDataUnsafe?.hash
    // }

    //   axios
    //     .post(`${import.meta.env.VITE_API_URL}/api/auth/telegram`, userData, {
    //       headers: {
    //         initdata: tg.initData
    //       }
    //     })
    //     .then((response) => {
    //       setUser(response.data)
    //       console.log('Authenticated:', response.data)
    //     })
    //     .catch((error) => {
    //       console.error('Error authenticating:', error)
    //     })
    // }, [])

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/telegram`, null, {
        headers: {
          initdata: tg.initData
        }
      })
      .then((response) => {
        setUser(response.data)
        console.log('Authenticated:', response.data)
      })
      .catch((error) => {
        console.error('Error authenticating:', error)
      })
  }, [])

  return (
    <div className="landing-page">
      <h1>Welcome to Telegram Mini App</h1>
      <div className="landing-page__logo">
        <img className="logo" src={medSyncLogo} alt="MedSync Logo" />
      </div>
      {user && (
        <div>
          <h2>Hello, {user.username}</h2>
          <p>Telegram ID: {user.telegramId}</p>
        </div>
      )}
    </div>
  )
}

export default App

// import { useEffect, useState } from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import LandingPage from './pages/landing-page.jsx'
// import GetTested from './pages/get-tested.jsx'
// import DoctorSelection from './pages/doctor-selection.jsx'
// import About from './pages/doctor-about.jsx'
// import PatientInformation from './pages/patient-info-form.jsx'

// import SlotSelection from './pages/appointment-booking.jsx'
// import RegistrationConfirmation from './pages/successful-booking.jsx'
// import ClinicSelection from './pages/clinic-selection.jsx'
// import FullSummary from './pages/booking-resume.jsx'
// import {
//   useHapticFeedback,
//   useShowPopup
// } from '@vkruglikov/react-telegram-web-app'

// const App = () => {
//   const showPopup = useShowPopup()
//   const [impactOccurred, notificationOccurred, selectionChanged] =
//     useHapticFeedback()
//   const [isInvalidVersion, setIsInvalidVersion] = useState(false)

//   useEffect(() => {
//     const tg = window.Telegram.WebApp
//     tg.ready()
//     if (tg.initDataUnsafe?.user?.id) {
//       console.log(1, 'есть юзер c айди')
//       if (window.Telegram && window.Telegram.WebApp) {
//         if (!window.Telegram.WebApp.isVersionAtLeast('6.9')) {
//           notificationOccurred('error')
//           if (window.Telegram.WebApp.isVersionAtLeast('6.2')) {
//             showPopup({
//               message:
//                 'Please update your Telegram app to the latest version to use this app.'
//             })
//           } else {
//             console.log('the version is not supported')
//             setIsInvalidVersion(true)
//           }
//         }
//         // Alternatively to what can be set with react-telegram-web-app, you can directly set the following properties:
//         try {
//           window.Telegram.WebApp.requestWriteAccess()
//         } catch (e) {
//           console.log(e)
//         }
//         window.Telegram.WebApp.expand()
//       }
//     } else {
//       console.log(2, 'нет юзера')
//     }
//   }, [])

//   return (
//     <>
//       {isInvalidVersion && (
//         <div className="invalid-version">
//           <div className="invalid-version__content">
//             <h1>Sorry but this version is outdated!</h1>
//             <h1>
//               Please update your Telegram app to the latest version to use this
//               app.
//             </h1>
//           </div>
//         </div>
//       )}
//       {!isInvalidVersion && (
//         <BrowserRouter>
//           <Routes>
//             <Route
//               path="/"
//               element={<LandingPage isInvalidVersion={isInvalidVersion} />}
//             />
//             <Route path="/see_a_doctor" element={<DoctorSelection />} />
//             <Route path="/get_tested" element={<GetTested />} />
//             <Route path="/doctor/:doctor_id" element={<About />} />
//             <Route
//               path="/booking/appointment"
//               element={
//                 <SlotSelection storageKey="selectedDoctor" itemType="doctors" />
//               }
//             />
//             <Route
//               path="/booking/diagnostics/:diagnostic_id"
//               element={<ClinicSelection />}
//             />
//             <Route
//               path="/booking/clinic"
//               element={
//                 <SlotSelection
//                   storageKey="selectedDiagnostic"
//                   itemType="diagnostics"
//                 />
//               }
//             />
//             <Route
//               path="/booking/patient-info-form/:itemType"
//               element={<PatientInformation />}
//             />

//             <Route
//               path="/booking/confirmation/:itemType"
//               element={<FullSummary />}
//             />

//             <Route
//               path="/successful_booking"
//               element={<RegistrationConfirmation />}
//             />
//           </Routes>
//         </BrowserRouter>
//       )}
//     </>
//   )
// }

// export default App

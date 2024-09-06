import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import {
  BackButton,
  MainButton,
  useCloudStorage,
  useHapticFeedback,
  useInitData,
  useShowPopup
} from '@vkruglikov/react-telegram-web-app'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ResumeBlock } from '../components/Resume/ResumeBlock.jsx'
import fetchUserDataAndLocationInfo from '../utils/summaryData.js'
import Resume from '../components/Resume/SummaryInfo.jsx'
import storage from '../utils/localStorage.js'
import { toast } from 'sonner'

const FullSummary = () => {
  // const storage = useCloudStorage()
  const webApp = window.Telegram?.WebApp
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()
  const [InitDataUnsafe, InitData] = useInitData()
  var fakeInitData =
    'query_id=AAHMWgYrAAAAAMxaBiuJKfOE&user=%7B%22id%22%3A721836748%2C%22first_name%22%3A%22%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%22%2C%22last_name%22%3A%22%D0%90%22%2C%22username%22%3A%22gruzz70tomsk%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725548886&hash=cbeaa9674db6fa974784fa15e7297892baa1e8609a354ff9ea47cce7637a7a27'

  const [doctorData, setDoctorData] = useState(null)
  const [diagnosticData, setDiagnosticData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)

  const [workingHours, setWorkingHours] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const showPopup = useShowPopup()
  const navigate = useNavigate()
  const { itemType } = useParams()

  // const fetchDoctorData = async (storage) => {
  //   try {
  //     const doctor = JSON.parse(await storage.getItem('selectedDoctor'))
  //     if (!doctor) {
  //       throw new Error('Данные врача отсутствуют')
  //     }
  //     return doctor
  //   } catch (err) {
  //     console.error('Ошибка в fetchDoctorData:', err)
  //     return null
  //   }
  // }

  const fetchDoctorData = async () => {
    const doctor = JSON.parse(await storage.getItem('selectedDoctor'))
    setDoctorData(doctor)
    return doctor
  }
  const fetchDiagnosticData = async () => {
    const diagnostic = JSON.parse(await storage.getItem('selectedDiagnostic'))
    setDiagnosticData(diagnostic)
    return diagnostic
  }

  useEffect(() => {
    if (itemType === 'doctors') {
      fetchDoctorData().then((doctor) => {
        fetchUserDataAndLocationInfo(storage).then((data) => {
          if (data.error) {
            toast.warning('Извините, некоторые данные отсутствуют!')
          }
          // if (data.error) {
          //   showPopup({ message: 'Sorry, some data is missing!' }).then(() =>
          //     navigate(-1)
          //   )
          // }
          setUserData(data.userData)
          setSelectedTimeSlot(data.selectedTimeSlot)
          setDoctorData(doctor)
          setWorkingHours(data.hoursArray)
          setSelectedLocation(data.selectedLocation)

          storage.getItem('save_data').then((toSave) => {
            if (!JSON.parse(toSave)) {
              storage.removeItem('user_data')
            }
          })
        })
      })
    } else {
      fetchDiagnosticData().then((diagnostic) => {
        fetchUserDataAndLocationInfo(storage).then((data) => {
          if (data.error) {
            showPopup({ message: 'Sorry, some data is missing!' }).then(() =>
              navigate(-1)
            )
          }

          setUserData(data.userData)
          setSelectedTimeSlot(data.selectedTimeSlot)
          setWorkingHours(data.hoursArray)
          setSelectedLocation(data.selectedLocation)
          setDiagnosticData(diagnostic)

          storage.getItem('save_data').then((toSave) => {
            if (!JSON.parse(toSave)) {
              storage.removeItem('user_data')
            }
          })
        })
      })
    }
  }, [])

  /*TODO: от GPT с обработкой ошибок*/
  // useEffect(() => {
  //   fetchDoctorData(storage).then((doctor) => {
  //     if (!doctor) {
  //       showPopup({ message: 'Sorry, doctor data is missing!' }).then(() =>
  //         navigate(-1)
  //       )
  //       return
  //     }

  //     fetchUserDataAndLocationInfo(storage).then((data) => {
  //       if (data.error) {
  //         showPopup({ message: 'Sorry, some data is missing!' }).then(() =>
  //           navigate(-1)
  //         )
  //         return
  //       }

  //       setUserData(data.userData)
  //       setSelectedTimeSlot(data.selectedTimeSlot)
  //       setDoctorData(doctor)
  //       setWorkingHours(data.hoursArray)
  //       setSelectedLocation(data.selectedLocation)

  //       storage.getItem('save_data').then((toSave) => {
  //         if (!JSON.parse(toSave)) {
  //           storage.removeItem('user_data')
  //         }
  //       })
  //     })
  //   })
  // }, [])

  const handleSubmit = async () => {
    try {
      // const response = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/api/booking/${itemType}`,
      //   // `${import.meta.env.VITE_API_URL}/api/${itemType}/book_slot`,
      //   {
      //     doctor_id: doctorData?.doctor_id,
      //     diagnostic_id: diagnosticData?.diagnostic_id,
      //     booking_date_time: selectedTimeSlot,
      //     location_id: selectedLocation?.location_id,
      //     user_name: userData.userName,
      //     user_surname: userData.userSurname,
      //     user_phone: userData.userPhone,
      //     user_email: userData.userEmail,
      //     user_message: userData.userMessage,
      //     userInitData: InitData
      //   }
      // )

      const formattedBookingDateTime = new Date(selectedTimeSlot).toISOString()

      const data = {
        telegramId: String(InitDataUnsafe?.user?.id || 721836748),
        userName: userData.userName,
        userSurname: userData.userSurname,
        userPhoneNumber: userData.userPhone,
        userEmail: userData.userEmail,
        userMessage: userData.userMessage,
        bookingDateTime: new Date(selectedTimeSlot).toISOString(),
        doctorId: doctorData?.doctorId,
        diagnosticId: diagnosticData?.diagnosticId,
        locationId: selectedLocation?.locationId,
        userInitData: InitData || fakeInitData
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/booking/${itemType}`,
        data
      )

      console.log(8889, response.data)
      // console.log(
      //   8888,
      //   'JSON.parse',
      //   JSON.parse(await storage.getItem('user_data'))
      // )
      notificationOccurred('success')
      toast.success('Ваша запись подтверждена!')
      // await showPopup({ message: 'Ваша запись подтверждена!' })
      // await webApp.sendData(
      //   JSON.stringify({
      //     action: 'booking_confirmed',
      //     booking_id: response.data.booking_id
      //   })
      // )

      navigate('/')
      // navigate('/successful_booking')
    } catch (err) {
      toast.error('Извините, что-то пошло не так!')
      notificationOccurred('error')
      // await showPopup({ message: 'Извините, что-то пошло не так!' })
      console.error(err)
      navigate(-1)
    }
  }

  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      {!userData && (
        <div className="">
          <button onClick={() => navigate(-1)}>назад</button>
          <button onClick={() => navigate('/')}>дом</button>
          <div className="">некоторые данные отсутствуют вернись назад</div>
        </div>
      )}

      <div className="resume">
        {userData && (
          <div className="resume__blocks">
            <Header className="resume" title="Краткое содержание" />
            <Resume
              userData={userData}
              selectedTimeSlot={selectedTimeSlot}
              selectedLocation={selectedLocation}
              hoursArray={workingHours}
            />

            {doctorData && (
              <ResumeBlock title="Ваш доктор">
                <div className="resume__doctor">
                  <img
                    className="resume__doctor__image"
                    src={doctorData.photoUrl}
                    alt="Doctor"
                  />
                  <div className="resume__doctor__info">
                    <div className="resume__block__title">
                      {doctorData.fullName}
                    </div>
                    <div className="resume__block__text--color-dark">
                      {doctorData.specialty.specialtyName}
                    </div>
                  </div>
                </div>
              </ResumeBlock>
            )}
            {diagnosticData && (
              <ResumeBlock title="Your Diagnostic">
                <div className="resume__diagnostics">
                  <img
                    className="resume__diagnostics__image"
                    src={diagnosticData.photo_url}
                    alt="Diagnostic"
                  />
                  <div className="resume__diagnostics__info">
                    <div className="resume__block__title">
                      {diagnosticData.type_name}
                    </div>
                    <div className="resume__block__text">
                      {diagnosticData.description}
                    </div>
                    <div className="resume__block__text">
                      Price: ${diagnosticData.price.toFixed(0)}
                    </div>
                  </div>
                </div>
              </ResumeBlock>
            )}
          </div>
        )}
        {userData && <button onClick={handleSubmit}>Жми</button>}
        {userData && <MainButton onClick={handleSubmit} text="Confirm" />}
      </div>
    </>
  )
}

export default FullSummary

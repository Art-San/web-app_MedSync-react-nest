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
import { bookingService } from '../services/booking/booking.service.js'

const FullSummary = () => {
  // const storage = useCloudStorage()
  const webApp = window.Telegram?.WebApp
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback()
  const [InitDataUnsafe, InitData] = useInitData()
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
            toast
              .warning('Извините, некоторые данные отсутствуют!')
              .then(() => navigate(-1))
          }
          // if (data.error) {
          //   showPopup({ message: 'Извините, некоторые данные отсутствуют!' }).then(() =>
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
            toast
              .warning('Извините, некоторые данные отсутствуют!')
              .then(() => navigate(-1))
          }
          // if (data.error) {
          //   showPopup({ message: 'Извините, некоторые данные отсутствуют!' }).then(() =>
          //     navigate(-1)
          //   )
          // }

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

  const handleSubmit = async () => {
    try {
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
        userInitData: InitData || import.meta.env.VITE_API_URL
      }

      const response = await bookingService.createdBooking(itemType, data)

      notificationOccurred('success')
      toast.success('Ваша запись подтверждена!')
      // await showPopup({ message: 'Ваша запись подтверждена!' })
      // await webApp.sendData(
      //   JSON.stringify({
      //     action: 'booking_confirmed',
      //     booking_id: response.data.booking_id
      //   })
      // )

      navigate('/successful_booking')
    } catch (err) {
      toast.error('Извините, что-то пошло не так в handleSubmit!')
      notificationOccurred('error')
      // await showPopup({ message: 'Извините, что-то пошло не так в handleSubmit!' })
      console.error(err)
      navigate(-1)
    }
  }

  return (
    <>
      <BackButton onClick={() => navigate(-1)} />
      {!userData && (
        <div className="">
          <button onClick={() => navigate('/')}>дом</button>
          <button onClick={() => navigate(-1)}>назад</button>
          <div className="">некоторые данные отсутствуют вернись назад</div>
        </div>
      )}

      <div className="resume">
        {userData && (
          <div className="resume__blocks">
            <div className="">
              <button onClick={() => navigate('/')}>дом</button>
              <button onClick={() => navigate(-1)}>назад</button>
            </div>
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
                    src={diagnosticData.photoUrl}
                    alt="Diagnostic"
                  />
                  <div className="resume__diagnostics__info">
                    <div className="resume__block__title">
                      {diagnosticData.typeName}
                    </div>
                    <div className="resume__block__text">
                      {diagnosticData.description}
                    </div>
                    <div className="resume__block__text">
                      Price: ${diagnosticData.price}
                      {/* Price: ${diagnosticData.price.toFixed(0)} */}
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

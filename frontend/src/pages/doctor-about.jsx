import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/DoctorAbout/TopBar.jsx'
import DoctorInfo from '../components/DoctorAbout/DoctorInfo.jsx'
import Section from '../components/DoctorAbout/Section.jsx'
import ServicesList from '../components/DoctorAbout/ServicesList.jsx'
import axios from 'axios'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import WorkingHours from '../components/Resume/WorkingHours.jsx'
import { useEffect, useState } from 'react'
import { doctorService } from '../services/doctor/doctor.service.js'

const About = () => {
  const { doctorId } = useParams()
  console.log(333, 'doctorId', doctorId)
  const [doctor, setDoctor] = useState(null)
  console.log(123, 'doctor.locationId', doctor?.location?.locationId)
  const [workingHours, setWorkingHours] = useState([])

  console.log(222, 'workingHours', workingHours)
  let navigate = useNavigate()

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctor = await doctorService.getDoctorById(doctorId)

        // const doctor = await axios.get(
        //   `${import.meta.env.VITE_API_URL}/api/doctors/${doctorId}`
        // )
        const workingHours = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/working-hours/location/1`
        )
        // const workingHours = await axios.get(
        //   `${import.meta.env.VITE_API_URL}/api/working-hours/location/${
        //     doctor.location.locationId
        //   }`
        // )

        setWorkingHours(workingHours.data)
        setDoctor(doctor.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchDoctorInfo()
  }, [doctorId])

  return (
    <>
      <button onClick={() => navigate(-1)}>назад</button>
      <BackButton onClick={() => navigate(-1)} />
      {doctor && (
        <div className="about">
          <header className="header">
            <TopBar title="About" />
            <DoctorInfo
              name={doctor.fullName}
              specialty={doctor.specialty.specialtyName}
              status="Available"
              imageSrc={doctor.photoUrl}
            />
          </header>
          <main className="about__main">
            <Section title="Experience" tag="experience">
              {doctor.experience}
            </Section>
            <Section title="Services" tag="services">
              <ServicesList services={doctor.services} />
            </Section>
            <Section title="Certificates" tag="certificates">
              {doctor.certificates}
            </Section>
            <Section title="Working Time" tag="working-time">
              {/* <WorkingHours /> */}
              <WorkingHours hoursArray={workingHours} />
            </Section>
            <Section title="Location" tag="location">
              <div className="location">
                <p className="about__section__title">{doctor.location.name}</p>
                <p className="about__section__text">
                  {doctor.location.address}
                </p>
              </div>
            </Section>
          </main>
        </div>
      )}
    </>
  )
}
export default About

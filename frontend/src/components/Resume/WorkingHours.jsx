const hoursArray1 = [
  {
    weekday_index: 0,
    start_time: '09',
    end_time: '18'
  },
  {
    weekday_index: 1,
    start_time: '08',
    end_time: '20'
  },
  {
    weekday_index: 2,
    start_time: '07',
    end_time: '19'
  },
  {
    weekday_index: 3,
    start_time: '08',
    end_time: '17'
  },
  {
    weekday_index: 4,
    start_time: '09',
    end_time: '16'
  },
  {
    weekday_index: 5,
    start_time: '10',
    end_time: '14'
  },
  {
    weekday_index: 6,
    start_time: undefined,
    end_time: undefined
  }
]

const mapIndexToWeekday = (index) => {
  const weekdays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ]
  const weekdays1 = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  return weekdays[index]
}

const WorkingHours = ({ hoursArray }) => {
  const parsedHoursArray = hoursArray.map((item) => ({
    day: mapIndexToWeekday(item.weekdayIndex),
    start: `${item.startTime}:00`,
    end: `${item.endTime}:00`
  }))
  // const WorkingHours = ({ hoursArray }) => {
  //   const parsedHoursArray = hoursArray1.map((item) => ({
  //     day: mapIndexToWeekday(item.weekday_index),
  //     start: `${item.start_time}:00`,
  //     end: `${item.end_time}:00`
  //   }))

  return (
    <div className="working-hours">
      {parsedHoursArray.map((hours, index) => (
        <div className="box__text" key={index}>
          {hours.day}{' '}
          <span className="box__text--color-light">
            {hours.start && hours.end
              ? `${hours.start} - ${hours.end}`
              : 'Closed'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default WorkingHours

import {useState, useEffect} from 'react' 

const TimeDate = () => {
    const [day, setDay] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [time, setTime] = useState()


    useEffect(() => {
        setInterval(() => {
            let timeFormat = new Intl.DateTimeFormat('en-US', {
                hour:'numeric',
                minute: 'numeric',
            })
            const date = new Date()
            setDay(date.getDate())
            setMonth(date.getMonth())
            setYear(date.getFullYear())
            setTime(timeFormat.format(date))
        }, 1000)
        
    }, [])
    return (
        <div className='time'>
            <h3>{time + ', ' +  month + '/' + day + '/' + year}</h3>
        </div>
    )
}

export default TimeDate

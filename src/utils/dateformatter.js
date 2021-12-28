import {defaultDateDelimiter} from "../config/config";

class DateFormatter {

    static convert(str, showTime = true, delimiter = defaultDateDelimiter) {
        let date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2),
            minutes = ("0" + date.getMinutes()).slice(-2),
            seconds = ("0" + date.getSeconds()).slice(-2),
            time = `${date.getHours()}:${minutes}:${seconds}`,
            formattedDate = [day, month, date.getFullYear()].join(delimiter),
            dateWithTime = `${formattedDate} ${time}`;

        if (showTime) {
            return dateWithTime
        }
        return formattedDate
    }
}

export default DateFormatter
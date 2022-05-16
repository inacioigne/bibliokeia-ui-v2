export default function Time() {
    const date = new Date()
    const year = date.getFullYear()
    const m = date.getMonth()+1
    const month = (m < 10) ? '0'+m.toString() : m.toString()
    const day = (date.getDate() < 10) ? '0'+date.getDate().toString() : date.getDate().toString()
    const hours = (date.getHours() < 10) ? 
    '0'+date.getHours().toString() : 
    date.getHours().toString()
    const minutes = (date.getMinutes() < 10) ? 
    '0'+date.getMinutes().toString() : 
    date.getMinutes().toString()
    const seconds = (date.getSeconds() < 10) ? 
    '0'+date.getSeconds().toString() : 
    date.getSeconds().toString()
    const mils = date.getMilliseconds()
    const time = year+month+day+hours+minutes+seconds+".0"
    return time
  }
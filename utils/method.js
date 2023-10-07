const formatDate = (d) => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let newdate = new Date(d)

    let str = `${days[newdate.getDay()]}, ${newdate.getDate()} ${months[newdate.getMonth()]} ${newdate.getFullYear()}`

    return str
}

export { formatDate }
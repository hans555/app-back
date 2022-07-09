function get_appointment(doctor_id, date) {
    return `SELECT * FROM appointments a WHERE a.doctor_id = ${doctor_id} AND a.date = ${date}`
}

module.exports = {
    get_appointment
}
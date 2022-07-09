function getAppointments(doctor_id, date) {
    return `SELECT * FROM appointments a WHERE doctor_id = \'${doctor_id}\' AND date = \'${date}\';`
}

module.exports = {
    getAppointments
}
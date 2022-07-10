const escape = require("pg-escape")

function getAppointments(doctor_id, date) {
    return escape("SELECT * FROM appointments a WHERE doctor_id = %L AND date = %L", doctor_id, date)
}

module.exports = {
    getAppointments
}
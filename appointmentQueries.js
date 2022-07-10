const escape = require("pg-escape")

function getAppointments(doctor_id, date) {
    return escape("SELECT * FROM appointments a WHERE doctor_id = %L AND date = %L", doctor_id, date)
}

function fixAppointment(appointment_id, appointment_date, appointment_time, doctor_id, patient_id) {
    return escape("INSERT INTO appointments VALUES (%L, %L, %L, %L, %L)", appointment_id, appointment_date, appointment_time, doctor_id, patient_id)
}

function cancelAppointment(appointment_date, appointment_time, doctor_id, patient_id) {
    return escape("DELETE FROM appointments WHERE date = %L AND time = %L AND doctor_id = %L AND patient_id = %L", appointment_date, appointment_time, doctor_id, patient_id)
}

module.exports = {
    getAppointments,
    fixAppointment,
    cancelAppointment
}
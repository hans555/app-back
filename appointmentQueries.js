const format = require("pg-format")

function getAppointments(doctor_id, date) {
    return format("SELECT * FROM appointments a WHERE doctor_id = %L AND date = %L", doctor_id, date)
}

function fixAppointment(appointment_id, appointment_date, appointment_time, doctor_id, patient_id) {
    return format("INSERT INTO appointments VALUES (%L, %L, %L, %L, %L)", appointment_id, appointment_date, appointment_time, doctor_id, patient_id)
}

function cancelAppointment(appointment_date, appointment_time, doctor_id, patient_id) {
    return format("DELETE FROM appointments WHERE date = %L AND time = %L AND doctor_id = %L AND patient_id = %L", appointment_date, appointment_time, doctor_id, patient_id)
}

function createAppointments(appointments) {
    return format("INSERT INTO appointments VALUES %L", appointments)
}

module.exports = {
    getAppointments,
    fixAppointment,
    cancelAppointment,
    createAppointments
}
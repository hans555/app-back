const { pool } = require("./database")
const { getAppointments, fixAppointment, cancelAppointment } = require("./appointmentQueries")
const jsonic = require("jsonic")

async function handleGetAppointment(req, res) {
    const body = jsonic(req.body)
    const {doctor_id, date} = body
    const query_string = getAppointments(doctor_id, date)

    try {
        const client = await pool.connect()
        data = await client.query(query_string)
        client.release()
        return res.status(200).json({
            appointments: data.rows
        })
    } catch (err) {
        console.log(err)
        return res.status(400).end()
    }
}

async function handleFixAppointment(req, res) {
    const body = jsonic(req.body)
    const {appointment_id, appointment_date, appointment_time, doctor_id, patient_id} = body
    const query_string = fixAppointment(appointment_id, appointment_date, appointment_time, doctor_id, patient_id)

    try {
        const client = await pool.connect()
        data = await client.query(query_string)
        client.release()
        return res.status(200).end()
    } catch (err) {
        console.log(err)
        return res.status(400).end()
    }
}

async function handleCancelAppointment(req, res) {
    const body = jsonic(req.body)
    const { appointment_date, appointment_time, doctor_id, patient_id } = body
    const query_string = cancelAppointment(appointment_date, appointment_time, doctor_id, patient_id)
    console.log(query_string)
    try {
        const client = await pool.connect()
        data = await client.query(query_string)
        client.release()
        return res.status(200).end()
    } catch (err) {
        console.log(err)
        return res.status(400).end()
    }
}

module.exports = {
    handleGetAppointment,
    handleFixAppointment,
    handleCancelAppointment
}
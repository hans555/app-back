const { pool } = require("./database")
const { getAppointments, fixAppointment, cancelAppointment, createAppointments } = require("./appointmentQueries")
const jsonic = require("jsonic")

async function handleGetAppointment(req, res) {
    const body = jsonic(req.body)
    const {doctor_id, date} = body
    const query_string = getAppointments(doctor_id, date)
    const client = await pool.connect()
    try {
        data = await client.query(query_string)
        res.status(200).json({
            appointments: data.rows
        })
    } catch (err) {
        console.log(err)
        res.status(400).end()
    } finally {
        client.release()
    }
}

async function handleFixAppointment(req, res) {
    const body = jsonic(req.body)
    const {appointment_id, appointment_date, appointment_time, doctor_id, patient_id} = body
    const query_string = fixAppointment(appointment_id, appointment_date, appointment_time, doctor_id, patient_id)
    const client = await pool.connect()
    try {
        await client.query(query_string)
        res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(400).end()
    } finally {
        client.release()
    }
}

async function handleCancelAppointment(req, res) {
    const body = jsonic(req.body)
    const { appointment_date, appointment_time, doctor_id, patient_id } = body
    const query_string = cancelAppointment(appointment_date, appointment_time, doctor_id, patient_id)

    const client = await pool.connect()
    try {
        data = await client.query(query_string)
        res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(400).end()
    } finally {
        client.release()
    }
}

async function handleCreateAppointments(req, res) {
    const body = jsonic(req.body)
    const { appointments } = body
    const appointment_values = appointments.map(x => Object.values(x))
    const query_string = createAppointments(appointment_values)

    const client = await pool.connect()
    try {
        await client.query(query_string)
        res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(400).end() 
    } finally {
        client.release()
    }
}

module.exports = {
    handleGetAppointment,
    handleFixAppointment,
    handleCancelAppointment,
    handleCreateAppointments
}
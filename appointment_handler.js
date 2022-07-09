const pool = require("database")
const appointmentQueries = require("appointment_queries")
const { get_appointment } = require("./appointment_queries")
const jsonic = require("jsonic")

async function get_appointments(req, res) {
    const body = jsonic(req.body)
    const {doctor_id, date} = body

    try {
        const client = await pool.connect()
    } catch {

    } finally {

    }
}


module.exports = {
    get_appointments
}
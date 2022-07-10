const { pool } = require("./database")
const { getAppointments } = require("./appointmentQueries")
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

module.exports = {
    handleGetAppointment
}
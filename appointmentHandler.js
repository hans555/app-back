const { pool } = require("./database")
const { getAppointments } = require("./appointmentQueries")
const jsonic = require("jsonic")

async function handleGetAppointment(req, res) {
    const body = jsonic(req.body)
    const {doctor_id, date} = body
    console.log(body)
    const query_string = getAppointments(doctor_id, date)

    try {
        const client = await pool.connect()
        console.log(query_string)
        data = await client.query(query_string)
        client.release()
        console.log(data.rows)
        return res.status(200).end()
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    handleGetAppointment
}
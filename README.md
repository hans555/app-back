## Setting up

### Create env file

Create a `.env` file and fill up the following values

`PORT=8080`

`DB_HOST=`

`DB_DATABASE=`

`DB_USER=`

### Update database

Install postgreSQL and run the `create_table.sql` in the database.

## Available Scripts

In the project directory, you can run:

### `nodemon app.js`

Runs the app in the development mode.


### Case Study

Following points explain the appointment system in a hospital.

Patient will have attributes such as name, age, etc.
A patient can consult multiple doctors and vice-versa.
A patient can have multiple appointments with doctors.
Doctors also will have access to their appointments with patients.
An appointment will have the details such as date & time, consulting doctor, patient, etc.
While fixing the appointment
Doctor's consultation duration is 1hr
Doctor's consultation time will be between 8am - 4pm

Q1

Identify the entities & relations. Load the given CSV data into the objects
entity: patient, doctor 
relations: appointment

Q2

Get all appointments for the given doctor & date

Q3

Fix appointment by patient, doctor and date & time

Q4

Cancel appointment by patient, doctor and date & time

Note:

Assume that the data in the CSV is correct and corresponding entity is inside the database


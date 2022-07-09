CREATE TABLE patients (
    id VARCHAR(8) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(8) NOT NULL 
);

CREATE TABLE doctors (
    id VARCHAR(8) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE appointments (
    id VARCHAR(8) UNIQUE NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL CHECK (time >= "08:00:00" and time <= "15:00:00"),
    doctor_id VARCHAR(8) NOT NULL,
    patient_id VARCHAR(8) NOT NULL,
    PRIMARY KEY (id, doctor_id, patient_id, date, time),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);


CREATE OR REPLACE FUNCTION verify_doctor_appointment() RETURNS TRIGGER AS $$
    BEGIN
        IF EXISTS (
            SELECT * 
            FROM appointments 
            WHERE appointments.doctor_id = NEW.doctor_id 
                AND appointments.date = NEW.date
                AND appointments.time < NEW.time + interval '1 hours' 
                AND appointments.time > NEW.time - interval '1 hours') 
            THEN
                RAISE EXCEPTION 'DOCTOR IS NOT AVAILABLE';
        END IF;
        RETURN NEW;
    END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER verify_doctor_appointment_trg 
BEFORE INSERT OR UPDATE 
ON appointments
FOR EACH ROW 
EXECUTE FUNCTION verify_doctor_appointment();


INSERT INTO doctors 
VALUES 
    ('D1', 'D1Name'), 
    ('D2', 'D2Name');


INSERT INTO patients 
VALUES
    ('P1', 'P1Name', 12, 'M'),
    ('P2', 'P2Name', 22, 'F'),
    ('P3', 'P3Name', 32, 'M');

INSERT INTO appointments
VALUES
    ('A1', '2018-03-08', '09:00:00', 'D1', 'P1'),
    ('A2', '2018-04-08', '10:00:00', 'D1', 'P1'),
    ('A3', '2018-03-08', '10:00:00', 'D1', 'P2'),
    ('A4', '2018-04-08', '11:00:00', 'D1', 'P1'),
    ('A5', '2018-03-18', '08:00:00', 'D2', 'P1'),
    ('A6', '2018-04-18', '09:00:00', 'D2', 'P1'),
    ('A7', '2018-03-18', '09:00:00', 'D2', 'P3'),
    ('A8', '2018-04-18', '10:00:00', 'D2', 'P3');
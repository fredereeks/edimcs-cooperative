import mysql from "mysql"

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
})

db.connect(err => {
    if(err) throw new Error("Could not connect to database")
    console.log(`Connection successful`)
})

export default db
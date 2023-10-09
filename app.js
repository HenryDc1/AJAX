const express = require('express')
const url = require('url')
const { v4: uuidv4 } = require('uuid')
const database = require('./utilsMySQL.js')
const app = express()
const port = 8080

// Crear i configurar l'objecte de la base de dades
var db = new database()
db.init({
host: "localhost",
port: 3307,
user: "root",
password: "pwd",
database: "world"
})

// Publicar arxius carpeta ‘public’
app.use(express.static('public'))


// Configurar per rebre dades POST en format JSON
app.use(express.json());
// Configurar la direcció '/ajaxCall'
app.post('/ajaxCall', ajaxCall)
async function ajaxCall (req, res) {
    let objPost = req.body;
    let result = ""

    // Simulate delay (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (objPost.callType == 'tableData') {
        try {
            let qry = `SELECT * FROM ${objPost.table} LIMIT ${objPost.limit};`
            result = await db.query(qry)
        } catch (e) {
            console.error('Error at "ajaxCall":', e)
        }
    }
    res.send(result)
}

// Activar el servidor
const httpServer = app.listen(port, appListen)
function appListen () {
console.log(`Example app listening on: http://localhost:${port}`)
}

// Close connections when process is killed
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
function shutDown() {
console.log('Shutting down gracefully');
httpServer.close()
db.end()
process.exit(0);
}



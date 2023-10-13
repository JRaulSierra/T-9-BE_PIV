const express = require('express')
const database = require('./db/sqlConnection');
const cors = require('cors');
const app = express()
const PORT = 3001
app.use(express.json());

app.use(cors({
    origin: '*'
}));
let people = [
    {
      name: "Hannah Rickard",
      number: "06-51-99-56-83",
      id: 1
    },
    {
      name: "Hyun Namkoong",
      number: "10987654",
      id: 2
    },
    {
      name: "Courtney Martinez",
      number: "3691215",
      id: 3
    }
  ]

app.get('/mascota', (req,res) => {
    const query = 'SELECT * FROM mascotas';
    database.query(query, (err, results) => {
        if (err) {
        console.error('Error: ', err);
        res.status(500).json({ status: 0, message: 'Error en encontrar mascotas' });
        } else {
        res.json({ status: 200, mascotas: results });
        }
    });
})

app.post('/mascota', (req, res) => {
    const mascota = req.body; //{ "name": "Perrito", "fecha_nac": "2020-01-01", "raza": 1 }
    const query = "INSERT INTO progra_iv.mascotas (name, fecha_nac, raza) VALUES (?, ?, ?)";
    console.log(req.body)
    const values = [mascota.name, mascota.fecha_nac, mascota.raza];
    database.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al agregar la mascota: ', err);
            res.status(500).json({ status: 0, message: 'Error al agregar la mascota' });
        } else {
            res.json({ status: 1, message: 'Mascota agregada correctamente' });
        }
    });
});


app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})
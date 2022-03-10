const express = require("express")
const { DataTypes } = require("sequelize")
const app = express()
const sequelize = require("./models/index").sequelize
const User = require("./models/siswa")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post("/create_user", async (req, res) => {
    const data = await User(sequelize, DataTypes).create(
        {
            nama: req.body.nama,
            kelas: req.body.kelas,
            jurusan: req.body.jurusan
        }
    )
    return res.status(201).json({ message: "success created user", data: data })
})

app.get("/get_user", async (req, res) => {
    const data = await User(sequelize, DataTypes).findAll({})
    res.status(201).json({ message: "success get all user", data: data })
})

app.put("/edit_user/:id", async (req, res) => {
    const data = await User(sequelize, DataTypes).update(
        {
            nama: req.body.nama,
            kelas: req.body.kelas,
            jurusan: req.body.jurusan
        },
        {
            where: { id: req.params.id },
        }
    )
    return res.status(201).json({ message: "success created user", data: data })
})

app.delete("/delete_user/:id", async (req, res) => {
    await User(sequelize, DataTypes).destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "user berhasil di hapus" })
})

// app.get("/get_route", (req, res) => {
//     res.status(250).send("<h1>Okee</h1>")
// })

// app.post("/create_route", (req, res) => {
//     console.log(req.body)
//     res.status(300).json({message: "Dibuat Dari Server"})
// })

// app.get("/get_user_one/;id", async(req, res) => {
//     const params = req.params
//     console.log(params, "<<<<< ini params")
//     const data = await User(sequelize, DataTypes).findAll()
//     return ResizeObserver.status(201).json({MessageChannel: "succes get one user"})
// })

app.listen(2000, console.log("Listening at " + 2000))

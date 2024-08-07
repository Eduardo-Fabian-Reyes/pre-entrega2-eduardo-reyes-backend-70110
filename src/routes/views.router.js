import { Router } from "express";
const router = Router();

const arrayProductos = [
    {id: "1", img: "", title: "Glow On", description: "Album Musical de Turnstile", price: "1550", code: "1", stock: "6"},
    {id: "3", img: "", title: "Fresh Fruit for Rotting Vegetables", description: "Álbum de estudio de Dead Kennedys", price: "1899", code: "PUNK003", stock: "8"},
    {id: "4", img: "", title: "Dookie", description: "Álbum de estudio de Green Day", price: "1999", code: "PUNK004", stock: "12"},
    {id: "5", img: "", title: "Ramones", description: "Primer Album de los Ramones", price: "1299", code: "punk5678", stock: "150"},
    {id: "6", img: "", title: "Bad Religion", description: "Álbum de estudio de Bad Religion", price: "1899", code: "PUNK006", stock: "7"},
]

router.get('/', (req, res) => {
    res.render('index', {titulo:"Bad Wave Recs"});
});

router.get("/tienda", (req, res) => {
    res.render("tienda", {arrayProductos, titulo:"Tienda"})
});

router.get("/contacto", (req, res) => {
    res.render("contacto", {titulo:"Contacto"})
});






export default router;
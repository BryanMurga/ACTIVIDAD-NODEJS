const express = require('express');
const router = express.Router();
const pool = require('../database.js');
const { route } = require('./index.js');

router.get('/', async(req, res) =>{
    let listCandies = await pool.query('SELECT * FROM candies');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listCandies: listCandies
    });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;      
    let candies = await pool.query('SELECT * FROM candies WHERE id = ?',[id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        candies: candies
    });
});

router.post('/create', async(req, res) =>{
    const {name, price} = req.body;
    const products = {
        name,price, status: 1
    };

    await pool.query('INSERT INTO products set ?', [candies]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        product: products
    });

});

router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, expiration, isSalad, date_registered, date_created } = req.body;

    const candy = { name, price, expiration, isSalad, date_registered, date_created };

    pool.query('UPDATE candies SET ? WHERE  id = ?', [candy, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        candy:candy
    });
});

router.post('/delete/:id', async(req, res) =>{
    const { id } = req.params;

   await pool.query('UPDATE candies SET status = 0 WHERE id = ?', [id]);
   res.json({
       status: 200,
       message: "Se ha eliminado corectamente"
   });
});

module.exports = router;
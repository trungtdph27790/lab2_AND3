const express = require('express');
const mongoose = require('mongoose');
const sinhvien = require('./sinhvienModel');

// tạo đối tượng express 

const  app = express();
app.set('view engine','ejs');
// kết nối

mongoose.connect('mongodb://0.0.0.0:27017/AND103')
.then( () => { 
    console.log('đã kết nối thành công')
})
.catch( (err) =>{
    console.log(err);  
});

// đọc dữ liệu từ cơ sở dữ liệu

app.get('/sinhvien',async (req,res) => {
    try {
        const sinhviens = await sinhvien.find(); // đọc dữ liệu

        // res.json(sinhviens); // chuyển dữ liệu ra json

        res.render('sinhviens',{sinhviens: sinhviens});
        console.log(sinhviens);
    } catch (error) {
        console.log(error); // in ra lỗi
        res.status(500).json({error:'Internel Server Error'}) // trả về lỗi
    }
})

const  PORT = process.env.PORT || 3000 ;
// server lắng nghe 
app.listen(PORT,()=>{
    console.log('server đang chạy ở cổng 3000');
})
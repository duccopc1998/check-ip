const express = require('express');  
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');  

const app = express();  
const PORT = 3000;  

// Kết nối MongoDB Atlas - Thay thế chuỗi dưới đây bằng chuỗi của bạn  
const mongoURI = 'mongodb+srv://ducco1998x:Ckyeuvk98@checkip.imxeqij.mongodb.net/';  

mongoose.connect(mongoURI, {  
    useNewUrlParser: true,  
    useUnifiedTopology: true  
})  
.then(() => console.log('Kết nối MongoDB thành công'))  
.catch((err) => console.log('Lỗi kết nối MongoDB:', err));  

app.use(bodyParser.json());  

// Định nghĩa schema và model cho dữ liệu khách truy cập  
const visitorSchema = new mongoose.Schema({  
    ip: String,  
    city: String,  
    region: String,  
    country: String,  
    device: {  
        userAgent: String,  
        platform: String,  
        language: String,  
    },  
    timestamp: { type: Date, default: Date.now }  
});  

const Visitor = mongoose.model('Visitor', visitorSchema);  

// Route nhận dữ liệu khách truy cập  
app.post('/visitor', async (req, res) => {  
    const data = req.body;  

    const visitor = new Visitor(data);  

    try {  
        await visitor.save();  
        res.json({ message: 'Dữ liệu đã lưu thành công' });  
    } catch (err) {  
        res.status(500).json({ message: 'Lỗi lưu dữ liệu', error: err });  
    }  
});  

// Chạy server  
app.listen(PORT, () => {  
    console.log(`Server chạy tại http://localhost:${PORT}`);  
});

app.get('/visitors', async (req, res) => {  
    try {  
        const visitors = await Visitor.find();  
        res.json(visitors);  
    } catch (err) {  
        res.status(500).json({ message: 'Lỗi truy vấn dữ liệu', error: err });  
    }  
});
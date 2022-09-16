import {Router} from "express";
const phoneBookRouter = Router();
import {PhoneBook} from "../schema/phoneBook.model";
import multer from 'multer';
const upload = multer();

phoneBookRouter.get('/create', (req, res) => {
    res.render('create');
});

phoneBookRouter.post('/create',upload.none(), async (req, res) => {
    try{
        const newPhoneBook = new PhoneBook(req.body);
        const phoneBook = await newPhoneBook.save();
        if(phoneBook){
            res.redirect('/home');
        }else{
            res.send('Error');
        }
    }catch (err){
        res.render('error');
    }
});

phoneBookRouter.get('/home', async (req, res) => {
    const phoneBooks = await PhoneBook.find();
    res.render('home', {phoneBooks: phoneBooks});
});

phoneBookRouter.get('/update/:id', async (req, res) => {
    const phoneBookId = req.params.id;
    const updatePhoneBook = await PhoneBook.findOne({_id: phoneBookId});
    res.render('update', {phoneBook: updatePhoneBook});
});

phoneBookRouter.post('/update/:id',upload.none(), async (req, res) => {
    const phoneBookId = req.body.id;
    await PhoneBook.updateOne({_id: phoneBookId}, {name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address});
    res.redirect('/home');
});

phoneBookRouter.get('/delete/:id', async (req, res) => {
    const deletePhoneBookId = req.params.id;
    await PhoneBook.deleteOne({_id: deletePhoneBookId});
    res.redirect('/home');
})


export default phoneBookRouter;
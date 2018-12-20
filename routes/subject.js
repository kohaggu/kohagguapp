const express = require('express');
const mongoose = require('mongoose');
const paginate = require('express-paginate');
const router = express.Router();

const Notes = mongoose.model('notes');

router.get('/physics',(req,res) => {
    Notes.find({subject:'physics'})
    .then(notes => {
     res.render('subject/physics',{
          notes:notes
     });
    })
});
router.post('/physics', (req,res) => {
    if(req.body.class != 'ALL')
    {
    Notes.find({class:req.body.class,subject:'physics'})
    .then(notes => {
     res.render('subject/physics',{
          notes:notes
     });
    })
}
else 
 {
    Notes.find({subject:'physics'})
    .then(notes => {
     res.render('subject/physics',{
          notes:notes
     });
    })
 }
 });

 router.use(paginate.middleware(10, 50));
router.get('/chemistry', async (req,res) => {
     try {

          const [ results, itemCount ] = await Promise.all([
            Notes.find({subject:'chemistry'}).limit(req.query.limit).skip(req.skip).lean().exec(),
          Notes.count({subject:'chemistry'})
          ]);
      
          const pageCount = Math.ceil(itemCount / req.query.limit);
      
         
            res.render('subject/chemistry', {
              notes: results,
              pageCount,
              itemCount,
              pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
            });
            console.log(paginate.getArrayPages(req)(3, pageCount, req.query.page), pageCount,itemCount);
          
      
        } catch (err) {
          next(err);
        }

});

router.post('/chemistry', (req,res) => {
    if(req.body.class != 'ALL')
    {
    Notes.find({class:req.body.class,subject:'chemistry'})
    .then(notes => {
     res.render('subject/chemistry',{
          notes:notes
     });
    })
}
else 
 {
    Notes.find({subject:'chemistry'})
    .then(notes => {
     res.render('subject/chemistry',{
          notes:notes
     });
    })
 }
 });

router.get('/maths', (req,res) => {
    Notes.find({subject:'maths'})
    .then(notes => {
     res.render('subject/maths',{
          notes:notes
     });
    })
});
router.post('/maths', (req,res) => {
    if(req.body.class != 'ALL')
    {
    Notes.find({class:req.body.class,subject:'maths'})
    .then(notes => {
     res.render('subject/maths',{
          notes:notes
     });
    })
}
else 
 {
    Notes.find({subject:'maths'})
    .then(notes => {
     res.render('subject/maths',{
          notes:notes
     });
    })
 }
 });

router.get('/computer', (req,res) => {
    res.render('subject/computer');
});

module.exports = router;
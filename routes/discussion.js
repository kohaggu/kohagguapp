const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Discuss = mongoose.model('discussion')
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/ensureauth');



router.get('/physics', (req,res) => {
  Discuss.find({subject:'physics'})
  .populate('user')
  .sort({date:'desc'})
  .then(discuss => {
      res.render('discussions/physics', {
      discuss: discuss
    });
  });
});

router.get('/chemistry', (req,res) => {
  Discuss.find({subject:'chemistry'})
  .populate('user')
  .sort({date:'desc'})
  .then(discuss => {
      res.render('discussions/chem', {
      discuss: discuss
    });
  });
});

router.get('/maths', (req,res) => {
  Discuss.find({subject:'maths'})
  .populate('user')
  .sort({date:'desc'})
  .then(discuss => {
      res.render('discussions/maths', {
      discuss: discuss
    });
  });
});

router.get('/cs', (req,res) => {
  Discuss.find({subject:'computerscience'})
  .populate('user')
  .sort({date:'desc'})
  .then(discuss => {
      res.render('discussions/comp', {
      discuss: discuss
    });
  });
});

router.post('/',(req,res) => {
  console.log(req.body.subject)
  if(req.body.subject === 'ALL')
  {
    Discuss.find()
    .populate('user')
    .sort({date:'desc'})
    .then(discuss => {
        res.render('discussions/index', {
        discuss: discuss
      });
    });
  }
  else if(req.body.subject === 'physics') {
    Discuss.find({subject:'physics'})
    .populate('user')
    .sort({date:'desc'})
    .then(discuss => {
        res.render('discussions/index', {
        discuss: discuss
      });
    });
  }
  else if(req.body.subject === 'chemistry') {
    Discuss.find({subject:'chemistry'})
    .populate('user')
    .sort({date:'desc'})
    .then(discuss => {
    res.render('discussions/index', {
        discuss: discuss
      });
    });
  }
  else if(req.body.subject === 'maths') {
    Discuss.find({subject:'maths'})
    .populate('user')
    .sort({date:'desc'})
    .then(discuss => {
        res.render('discussions/index', {
        discuss: discuss
      });
    });
  }
  else if(req.body.subject === 'computerscience') {
    Discuss.find({subject:'computerscience'})
    .populate('user')
    .sort({date:'desc'})
    .then(discuss => {
        res.render('discussions/index', {
        discuss: discuss
      });
    });
  }
  
});

router.get('/', (req,res) => {
  Discuss.find({})
  .populate('user')
  .sort({date:'desc'})
  .then(discuss => {
      res.render('discussions/index', {
      discuss: discuss
    });
  });
});
router.get('/creatediscussion',ensureAuthenticated, (req,res) => {
    res.render('discussions/add');
});
//show particular dicussion
router.get('/show/:id', (req,res) => {
Discuss.findOne({_id: req.params.id})
.populate('user')
  .populate('comments.commentUser')
.then(discuss => {
  res.render('discussions/show', {
    discuss:discuss
  });
 
});
});
//create disucssion route
router.post('/creatediscussion', (req,res) => {
let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newDiscuss = {
    title: req.body.title,
    body: req.body.body,
    subject: req.body.subject,
    allowComments:req.body.allowComments,
    user: req.user.id
  }

  // Create discuss
  new Discuss(newDiscuss)
    .save()
    .then(discuss => {
      res.redirect(`/dashboard`);
    });
});
//edit form route
router.get('/edit/:id', (req,res) => {
  Discuss.findOne({
    _id: req.params.id
  })
  .then(discuss => {
    if(discuss.user != req.user.id){
      res.redirect('/discuss');
    } else {
      res.render('discussions/edit', {
        discuss: discuss
      });
    }
  });

});

// Edit Form Process
router.put('/:id', (req, res) => {
  Discuss.findOne({
    _id: req.params.id
  })
  .then(discuss => {
    let allowComments;
    
    if(req.body.allowComments){
      allowComments = true;
    } else {
      allowComments = false;
    }

    // New values
    discuss.title = req.body.title;
    discuss.body = req.body.body;
    discuss.status = req.body.status;
    discuss.allowComments = allowComments;

    discuss.save()
      .then(discuss => {
        res.redirect('/dashboard');
      });
  });
});
//delete discussion route
router.delete('/delete/:id' , (req,res) => {
   Discuss.remove({
     _id: req.params.id
   })
   .then(() => {
     res.redirect('/dashboard');
   })
});

// Add Comment
router.post('/comment/:id', (req, res) => {
  Discuss.findOne({
    _id: req.params.id
  })
  .then(discuss => {
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user.id
    }

    // Add to comments array
    discuss.comments.push(newComment);

    discuss.save()
      .then(discuss => {
        res.redirect(`/discuss/show/${discuss.id}`);
      });
  });
});

router.get('/user/:id', (req,res) => {
Discuss.find({
  user:req.params.id
})
.populate('user')
.then(discuss => {
  res.render('discussions/userdiscuss', {
    discuss:discuss
  })
})
});
module.exports = router;
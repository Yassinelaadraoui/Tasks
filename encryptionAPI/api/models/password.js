const mongoose = require('mongoose');

const plainPasswordSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    password: {
       type: String,
       required: true

   },
   encoded:  {
      type: String,
      required: true

  }

});

module.exports = mongoose.model('plainPassword', plainPasswordSchema);

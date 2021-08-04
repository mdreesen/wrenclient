const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// The birthworker Schema uses regex to validate the email

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    lastname: {
      type: String,
      required: true,
      unique: false,
      trim: true
  },
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
// This checks to see if the password is new or has been modified
adminSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
adminSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// May think about adding friends to this
adminSchema.virtual('userCount').get(function() {
  return this.userCount.length;
});

const Admin = model('Admin', adminSchema);

module.exports = Admin;
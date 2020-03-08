const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    validate: [password => password.length >= 6, "Password Should be Longer"]
  },
  program: String,
  semester: String,
  salt: {
    type: String
  },
  provider: {
    type: String,
    // Validate 'provider' value existance
    required: "Provider is required"
  },
  providerId: String,
  providerData: {},
  created: {
    type: Date,
    default: Date.now
  }
});

StudentSchema.virtual("fullName")
  .get(function() {
    return this.firstName + " " + this.lastName;
  })
  .set(function(fullName) {
    var splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

StudentSchema.pre("save", function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64");
    this.password = this.hashPassword(this.password);
  }
  next();
});

StudentSchema.methods.hashPassword = function(password) {
  //console.log(crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex'))
  return crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
};

StudentSchema.statics.findUniqueEmail = function(username, suffix, callback) {
  const possibleEmail = username + (suffix || "");
  this.findOne(
    {
      email: possibleEmail
    },
    (err, user) => {
      // If an error occurs call the callback with a null value, otherwise find find an available unique username
      if (!err) {
        // If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
        if (!user) {
          callback(possibleEmail);
        } else {
          return this.findUniqueEmail(username, (suffix || 0) + 1, callback);
        }
      } else {
        callback(null);
      }
    }
  );
};

StudentSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

StudentSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

mongoose.model("Student", StudentSchema);

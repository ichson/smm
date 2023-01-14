require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/userSchema");
const cors = require("cors"); // cors
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
var paypal = require('paypal-rest-sdk');












paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': 'AXJ9CMeVjsPsBMFyocHDESa_VpCnEG0VAWoy7Qbmqt4kCSdxcac9APdqERF2Vg-83oZeUPhYFNWWuw_c',
  'client_secret': 'ENuv94GxZCg8wBrTDoric2VM1IViJCmXJpZWl9N-LvtNoyzWs6hAtJ_5IdP9a--nR-476KviKLxfdWvS'
});


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // cors middleware
app.use(express.json());

// Express session
app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "$2y$10$WVyimbHZ2bix8XyjhghYOOt2NBv5zYHDmchSQlpr21cS.vAZ.PfpS",
    cookie: { maxAge: 60000 * 720 },
    saveUninitialized: false,
    resave: false,
  })
);
app.use(flash());

// Mongoose Connect
mongoose
  .connect("mongodb+srv://vinh1337:Luke20081989@cluster0.0hhvprd.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB!"));

// EJS
app.use(express.static("public"));
app.set("view engine", "ejs");

// Sidebar Links
const navLinks = [
  {
    name: "Home",
    url: "/",
    icon: "home",
    isActive: true,
  },
  {
    name: "Services",
    url: "/",
    icon: "server",
    isActive: true,
  },
  {
    name: "SMM",
    url: "",
    icon: "transfer",
    isActive: true,
  },
  {
    name: "Tools",
    url: "/tools",
    icon: "compass",
    isActive: true,
  },
  {
    name: "Add Funds",
    url: "/addfunds",
    icon: "plus-circle",
    isActive: true,
  },
  {
    name: "User Settings",
    url: "/settings",
    icon: "user",
    isActive: true,
  },
  {
    name: "Logout",
    url: "/logout",
    icon: "logout",
    isActive: false,
  },
];

 

app.get("/", (req, res) => {
 
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec(function(error, result) {
    if (result.length > 0) {
      res.render("index", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds},
      
      });
    } else {
   res.render("loading")
    }
  });
});

// Login
app.get("/login", (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec(function(error, result) {
    if (result.length > 0) {
      res.redirect("/");
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});

// Register
app.get("/register", (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec(function(error, result) {
    if (result.length > 0) {
      res.redirect("/");
    } else {
      res.render("register", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/smm', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {
  res.render("addfunds", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/settings', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {
  res.render("settings", {
        navLinks: navLinks,
               user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/addfunds', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("addfunds", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/tools', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("tools", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/instagram', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("instagram", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/tiktok', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("tiktok", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/twitter', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("twitter", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/tele', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("tele", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/youtube', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("youtube", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/twitch', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("twitch", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/soundcloud', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("soundcloud", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/spotify', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("spotify", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email, funds: result[0].funds },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});
app.get('/instagram-scraper', (req, res) => {
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (result.length > 0) {

      res.render("instagram-scraper.ejs", {
        navLinks: navLinks,
        user: { name: result[0].name, email: result[0].email },
      });
    } else {
      res.render("login", {
        message: req.flash("message"),
        messageType: req.flash("messageType"),
      });
    }
  });
});

// Logout
app.get("/logout", (req, res) => {
  req.session.user_email = "";
  req.session.user_password = "";

  res.redirect("/login");
});

app.post("/checkout", async (req, res) => {
  const selectedService = req.body.service;
  if(selectedService == "Crypto" ){
    res.redirect("https://commerce.coinbase.com/checkout/5b275e79-8a38-42c0-9d34-b0c8230ffe2e")
  } else if(selectedService == "PayPal" ){ 
    UserModel.find({
      email: req.session.user_email,
      password: req.session.user_password,
    }).exec((error, result) => {
      if (error) {
        throw error;
      }
      if (result.length > 0) {
        req.session.quantity = req.body.quantity;
        var create_payment_json = {
          "intent": "sale",
          "payer": {
            "payment_method": "paypal"
          },
          "redirect_urls": {
            "return_url": "https://ichsmm.com/success",
            "cancel_url": "http://cancel.url"
          },
          "transactions": [{
            "item_list": {
              "items": [{
                "name": "item",
                "sku": "item",
                "price": req.session.quantity,
                "currency": "USD",
                "quantity": 1
              }]
            },
            "amount": {
              "currency": "USD",
              "total": req.session.quantity
            },
            "description": "This is the payment description."
          }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
            throw error;
          } else {
            for (var i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === "approval_url") {
                res.redirect(payment.links[i].href);
              }
            }
          }
        });
      } else {
        res.render("login", {
          message: req.flash("message"),
          messageType: req.flash("messageType"),
        });
      }
    });
  }
});

app.post('/order-checkout', (req, res) => {
  let price;
  UserModel.find({
    email: req.session.user_email,
    password: req.session.user_password,
  }).exec((error, result) => {
    if (error) {
      console.log(error);
      return;
    }
if (result.length < 0) {
  res.render("login", {
    message: req.flash("message"),
    messageType: req.flash("messageType"),
  });
} else if (result.length > 0) {
      const quantity = req.body.quantity;
      const selectedService = req.body.service;
      const xD = result[0].funds;
      if (selectedService === "instagram_views") {
  price = 0.0018 * quantity/1000;
} else if (selectedService === "instagram_likes") {
  price = 0.0622 * quantity/1000;
} else if (selectedService === "instagram_followers") {
  price = 0.29 * quantity/1000;
} else if (selectedService === "tiktok_views") {
  price = 0.002 * quantity/1000;
} else if (selectedService === "tiktok_likes") {
  price = 0.5 * quantity/1000;
} else if (selectedService === "tiktok_followers") {
  price = 0.5 * quantity/1000;
} else if (selectedService === "twitter_views") {
  price = 0.003 * quantity/1000;
} else if (selectedService === "twitter_profileinteraction") {
  price = 0.008 * quantity/1000;
} else if (selectedService === "twitter_followers") {
  price = 1 * quantity/1000;
} else if (selectedService === "Twitch_Video_Views") {
  price = 0.18 * quantity/1000;
} else if (selectedService === "Twitch_Followers") {
  price = 0.5 * quantity/1000;
} else if (selectedService === "Twitch_Live_Views") {
  price = 1.7059 * quantity/1000;
} else if (selectedService === "spotify_freeplays") {
  price = 0.2228 * quantity/1000;
} else if (selectedService === "spotify_followers") {
  price = 0.7 * quantity/1000;
} else if (selectedService === "soundcloud_plays") {
  price = 0.03 * quantity/1000;
} else if (selectedService === "soundcloud_followers") {
  price = 0.0405 * quantity/1000;
} else if (selectedService === "youtube_views") {
  price = 0.36 * quantity/1000;
} else if (selectedService === "youtube_likes") {
  price = 0.4 * quantity/1000;
} else if (selectedService === "youtube_dislikes") {
  price = 0.4 * quantity/1000;
} else if (selectedService === "youtube_subs") {
  price = 0.6 * quantity/1000;
} else if (selectedService === "youtube_comments") {
  price = 2.4246 * quantity/1000;
} else if (selectedService === "tele_views") {
  price = 0.0032 * quantity/1000;
} else if (selectedService === "tele_members") {
  price = 0.27 * quantity/1000;
} else if (selectedService === "discord_members") {
  price = 0.8 * quantity/1000;
}

      } else {
        price = 0;
      }

      if (result[0].funds >= price) {
        UserModel.findOneAndUpdate(
          { email: req.session.user_email },
          { $inc: { funds: -price } },
          (error, result) => {
            if (error) {
              console.log(error);
              return;
            }
         
      // console.log(JSON.stringify(payment))
      const paymentMethod = req.body.service;;
      const payerEmail =  req.session.user_email;


      const description = 
        `Service: \`${paymentMethod}\`
        Payment status: \`Pending..\`
        Payer email: \`${payerEmail}\`
        Funds: \`${xD}\`
        Funds Detucted: \`${price}\`
        IP address: \`${req.ip}\`
        User agent: \`${req.headers['user-agent']}\``;

      const data = {
        embeds: [{
          title: 'New Order Created',
          description: description
        }]
      };
// axios.post('https://discord.com/api/webhooks/1063905853507387513/KXQWZ54yJkPQxXJiZXmddRDhVcN2iDgmakA7dR61RqjwYT82yOkeow-feIiUCZbioVRr', data)
            res.json({ message: `Order placed successfully! | Funds Deducted: ${price}` });
          }
        );
      } else {
        res.json({ message: "Insufficient funds. Please add more funds to your account." })
      }
  
  });
});

app.get("/success", (req, res) => {
  const payer = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const execute_payment_json = {
    payer_id: payer,
    transactions: [{
      amount: {
        currency: "USD",
        total:  req.session.quantity
      }
    }]
  };
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      console.log(error);
    } else {
      // console.log(JSON.stringify(payment))
      const paymentMethod = payment.payer.payment_method;
      const paymentStatus = payment.payer.status;
      const payerEmail = payment.payer.payer_info.email;
      const payerFirstName = payment.payer.payer_info.first_name;
      const payerLastName = payment.payer.payer_info.last_name;
      const payerId = payment.payer.payer_info.payer_id;
      const address = payment.payer.payer_info.shipping_address;
      const totalPrice = payment.transactions[0].amount.total;
      const description = 
        `Payment method: \`${paymentMethod}\`
        Payment status: \`${paymentStatus}\`
        Payer email: \`${payerEmail}\`
        Payer full name: \`${payerFirstName} ${payerLastName}\`
        Payer ID: \`${payerId}\`
        Address: \`${JSON.stringify(address)}\`
        Total price: \`${totalPrice}\`
        IP address: \`${req.ip}\`
        User agent: \`${req.headers['user-agent']}\``;

      const data = {
        embeds: [{
          title: 'Payment Details',
          description: description
        }]
      };
 axios.post('https://discord.com/api/webhooks/1063905853507387513/KXQWZ54yJkPQxXJiZXmddRDhVcN2iDgmakA7dR61RqjwYT82yOkeow-feIiUCZbioVRr', data)
      // .then(response => {
        // console.log(response.status);
const email = req.session.user_email;
      const pricee =  req.session.quantity;
UserModel.updateOne(
  { email: email },
  { $inc: { funds:req.session.quantity  } }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      // Use the `send` method of the `response` object to send a response to the client
      res.redirect("https://ichsmm.com/");
    }

        }
      );
    }
  });
});

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// API Endpoints
app.use("/api/user", require("./routes/UserRoute"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

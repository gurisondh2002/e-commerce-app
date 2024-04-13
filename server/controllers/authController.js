const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'guri200802@gmail.com',
    pass: 'legmxipbqvmrxkxw'
  }
});


module.exports = {

  
  
  createUser : async (req, res) => {
      try {
          // Check if user already exists
          const existingUser = await User.findOne({ email: req.body.email });
          if (existingUser) {
              return res.status(400).json({ message: 'User already exists' });
          }
  
          // Encrypt the password
          const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
  
          const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: encryptedPassword,
              location: req.body.location,
              picture:req.body.picture,
              // image: imagePath // Store the file path instead of the image data
          });
  
          await newUser.save();

          const mailOptions = {
            from: 'guri200802@gmail.com',
            to: req.body.email,
            subject: 'Welcome to Trendzy!',
            html: `
              <p>Dear <strong>${req.body.username}</strong>,</p>
              <p>Thank you for joining <strong>Trendzy</strong>!</p>
              <p>We're thrilled to have you as a new member of our community. As an esteemed member, you now have access to a wide range of high-quality products, exclusive deals, and personalized recommendations.</p>
              <p><img src="cid:welcomeImage" alt="Welcome Image" style="max-width: 100%; height: auto;"></p>
              <p>Explore our diverse collection of products ranging from electronics and fashion to home decor and more. Whether you're looking for the latest gadgets, trendy fashion pieces, or stylish home essentials, we've got you covered.</p>
              <p>Shop with confidence knowing that we prioritize your satisfaction above all else. Our dedicated team is here to assist you every step of the way, ensuring a seamless shopping experience.</p>
              <p>Stay tuned for exciting updates, special promotions, and member-exclusive offers delivered straight to your inbox.</p>
              <p>Once again, welcome to <strong>Trendzy</strong>! Happy shopping!</p>
              <p>Best regards,</p>
              <p>Gurjeet Kaur</p>
            `,
            attachments: [{
              filename: 'welcome_image.png',
              path: 'C:/Users/dell/Desktop/Projects/e-commerce App/server/welcome_image.png',
              cid: 'welcomeImage'
            }]
          };
          
          await transporter.sendMail(mailOptions);

          res.status(201).json({ message: 'User created successfully', newUser });
      } catch (error) {
          console.error('Error creating user:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  },
  
  

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: "Wrong credentials..." });
      }
  
      const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
      const decryptedPassword = decryptPassword.toString(CryptoJS.enc.Utf8);
  
      if (decryptedPassword !== req.body.password) {
        return res.status(401).json({ message: "Wrong password" });
      }
  
      const userToken = jwt.sign({ id: user.id }, process.env.JWT_SEC, { expiresIn: "7d" });
  
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
  
      res.status(200).json({ ...userData, token: userToken });
    } catch (err) {
      console.error("Login failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }  
};
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');

require('dotenv/config')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kiagejay@gmail.com', 
    pass: 'ynsd mdzk apft ernd', 
  },
});

app.post('/upload-pdf', upload.fields([{ name: 'pdf' }, { name: 'invoice' }]), (req, res) => {
  try {
    const pdfFile = req.files['pdf'][0]; // Retrieve the uploaded PDF file
    const invoiceFile = req.files['invoice'][0]; // Retrieve the uploaded invoice file

    // Save the uploaded PDF file
    fs.writeFileSync('generated-pdf.pdf', pdfFile.buffer);

    // Save the uploaded invoice file
    fs.writeFileSync('payment-receipt', invoiceFile.buffer);

    res.status(200).json({ message: 'PDF uploaded successfully' });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/send-email', (req, res) => {
  const name = req.body.name;

  const mailOptions = {
    from: 'kiagejay@gmail.com',
    to: 'jacobkiage4@gmail.com',
    subject: `New Order for ${name}`,

    text: 'New order received. Please find the attached  LPO and Payment receipt.',
    attachments: [
      {
        filename: 'onlinelpo.pdf',
        content: fs.createReadStream('generated-pdf.pdf'),
      },
      {
        filename: 'paymentreceipt.pdf',
        content: fs.createReadStream('payment-receipt'),
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

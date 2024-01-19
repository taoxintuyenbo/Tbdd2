const express = require("express");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/momo-payment", (req, res) => {
  try {
    // Extract payment data from the request body
    const {
      accessKey,
      secretKey,
      orderInfo,
      partnerCode,
      redirectUrl,
      ipnUrl,
      amount,
      orderId,
      requestId,
      extraData,
      partnerName,
      storeId,
      paymentCode,
      orderGroupId,
      autoCapture,
      lang,
    } = req.body;

    // Create the raw hash string
    const rawHash = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&paymentCode=${paymentCode}&requestId=${requestId}`;

    // Calculate the signature
    const signature = CryptoJS.HmacSHA256(rawHash, secretKey).toString(
      CryptoJS.enc.Hex
    );

    // You can now use the extracted information, including the calculated signature, to make a request to MoMo

    // For demonstration purposes, you can log the information
    console.log("Received MoMo payment request:", req.body);
    console.log("Calculated signature:", signature);

    // Respond to the client with a success message
    res.json({
      success: true,
      message: "Payment request received successfully.",
    });
  } catch (error) {
    console.error("Error handling MoMo payment request:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

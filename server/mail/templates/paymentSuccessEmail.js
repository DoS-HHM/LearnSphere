exports.paymentSuccessEmail = (firstName, amount, orderId, paymentId) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
    <h2>LearnSphere payment received</h2>
    <p>Hi ${firstName},</p>
    <p>Your payment of ₹${amount} was received successfully.</p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Payment ID:</strong> ${paymentId}</p>
    <p>Thank you for learning with LearnSphere.</p>
  </div>
`;

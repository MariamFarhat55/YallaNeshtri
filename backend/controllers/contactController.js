let messages = [];

exports.sendMessage = (req, res) => {
  const { name, email, message } = req.body;
  messages.push({ name, email, message });
  res.json({ success: true, message: "Message received" });
};
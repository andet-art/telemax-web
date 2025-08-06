// controllers/contactController.js
import db from "../config/db.js";

export const saveContactMessage = async (req, res) => {
  const {
    firstName, lastName, email, phone,
    company, subject, message,
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO contact (first_name, last_name, email, phone, company, subject, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [firstName, lastName, email, phone, company || null, subject, message]
    );

    res.status(201).json({ success: true, message: "Message saved" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

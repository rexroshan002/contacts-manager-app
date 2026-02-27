const db = require('../db/connection');

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts');
    res.json(rows);
  } catch (err) {
  console.error("DB ERROR:", err);
  res.status(500).json({ error: err.message });
}
};

// Create contact
exports.createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
  return res.status(400).json({ error: 'All fields are required' });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ error: 'Invalid email format' });
}

  try {
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email,
      phone
    });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

// Update contact
// Update contact
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  // 1. ADD THIS: Validation checks
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const [result] = await db.query(
      'UPDATE contacts SET name=?, email=?, phone=? WHERE id=?',
      [name, email, phone, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact updated' });

  } catch (err) {
    // 2. ADD THIS: Duplicate email handling for updates
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to update contact' });
  }
};;

// Delete contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'DELETE FROM contacts WHERE id=?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();

  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};
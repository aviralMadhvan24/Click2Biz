import Purchase from "../models/Purchase.model.js";

export const createPurchase = async (req, res) => {
  try {
    const { id: clientId, name: clientName, email: clientEmail } = req.user;
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items are required" });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: "Valid total amount is required" });
    }

    // create services array dynamically
    const services = items.map(item => ({
      name: `${item.name} Service`,
      bundleType: item.category,
      status: "todo"
    }));

    const newPurchase = await Purchase.create({
      clientId,
      clientName,
      clientEmail,
      items,
      total,
      services,
      status: "pending"
    });

    res.status(201).json({
      message: "Purchase created successfully",
      purchase: newPurchase
    });
  } catch (err) {
    console.error('Purchase creation error:', err);
    res.status(500).json({ error: err.message });
  }
};


export const getPurchases = async (req, res) => {
  try {
    const { role, id } = req.user;
    let filter = {};

    if (role === 'admin') {
      // only completed orders for admin
      filter.status = 'completed';
    } else {
      // individual clients still see all their orders
      filter.clientId = id;
    }

    const purchases = await Purchase.find(filter).sort({ createdAt: -1 });
    res.json(purchases);
  } catch (err) {
    console.error('Get purchases error:', err);
    res.status(500).json({ error: err.message });
  }
};


export const updatePurchaseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(updatedPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};





export const updateServiceStatus = async (req, res) => {
  const { purchaseId, serviceIndex } = req.params;
  const { status } = req.body;

  const purchase = await Purchase.findById(purchaseId);
  if (!purchase) return res.status(404).json({ error: 'Purchase not found' });

  purchase.services[serviceIndex].status = status;
  await purchase.save();

  res.json({ success: true, updatedPurchase: purchase });
};

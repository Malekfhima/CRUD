const Item = require('../models/Item');

const validateItem = (data) => {
  const errors = [];
  if (!data.title || typeof data.title !== 'string')
    errors.push('title is required and must be a string');
  // Accept numeric strings from the client but coerce them
  const price = Number(data.price);
  if (!Number.isFinite(price) || price < 0)
    errors.push('price is required and must be a non-negative number');
  return { errors, price };
};

exports.getItems = async (req, res, next) => {
  try {
    const hasPage = Object.prototype.hasOwnProperty.call(req.query, 'page');
    const hasLimit = Object.prototype.hasOwnProperty.call(req.query, 'limit');
    const hasQ = Object.prototype.hasOwnProperty.call(req.query, 'q');

    // If no pagination/search params provided, return simple array for backward compatibility
    if (!hasPage && !hasLimit && !hasQ) {
      const items = await Item.find().sort({ createdAt: -1 });
      return res.json(items);
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 12);
    const q = req.query.q ? String(req.query.q).trim() : '';
    const filter = q
      ? {
          $or: [
            { title: new RegExp(q, 'i') },
            { description: new RegExp(q, 'i') },
          ],
        }
      : {};
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Item.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Item.countDocuments(filter),
    ]);
    res.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const { errors, price } = validateItem(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const item = new Item({
      title: req.body.title,
      description: req.body.description || '',
      price,
      imageUrl: req.body.imageUrl || '',
    });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(updates, 'price')) {
      const p = Number(updates.price);
      if (!Number.isFinite(p) || p < 0)
        return res
          .status(400)
          .json({ message: 'price must be a non-negative number' });
      updates.price = p;
    }
    const item = await Item.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};

import { Router } from 'express';
export const router = Router();

// Getting basket
router.get('/', (req, res) => {
  console.log('basket => GET /');

  try {
    const values = [
      {val: 30.05},
      {val: 30.83},
      {val: 30.71}
    ];
    res.json(values)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

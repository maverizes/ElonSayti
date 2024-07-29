import express from 'express';
import { getAllAds, getAdById, newAdForm, createAd, editAdForm, updateAd, deleteAd } from '../controllers/adControllers.js';

const router = express.Router();

router.get('/', getAllAds);
router.get('/new', newAdForm);
router.post('/', createAd);
router.get('/:id', getAdById);
router.get('/:id/edit', editAdForm);
router.post('/:id/update', updateAd);
router.post('/:id/delete', deleteAd);

export default router;

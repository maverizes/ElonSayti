import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../data/ads.json');

const readAdsFromFile = () => {
  const adsData = fs.readFileSync(dataFilePath);
  return JSON.parse(adsData);
};

const writeAdsToFile = (ads) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(ads, null, 2));
};

export const getAllAds = (req, res) => {
  const ads = readAdsFromFile();
  res.render('ads/index', { ads });
};

export const getAdById = (req, res) => {
  const ads = readAdsFromFile();
  const ad = ads.find(ad => ad.id === req.params.id);
  if (ad) {
    res.render('ads/show', { ad });
  } else {
    res.status(404).send('Ad not found');
  }
};

export const newAdForm = (req, res) => {
  res.render('ads/new');
};

export const createAd = (req, res) => {
  const ads = readAdsFromFile();
  const newAd = {
    id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  };
  ads.push(newAd);
  writeAdsToFile(ads);
  res.redirect('/ads');
};

export const editAdForm = (req, res) => {
  const ads = readAdsFromFile();
  const ad = ads.find(ad => ad.id === req.params.id);
  if (ad) {
    res.render('ads/edit', { ad });
  } else {
    res.status(404).send('Ad not found');
  }
};

export const updateAd = (req, res) => {
  const ads = readAdsFromFile();
  const adIndex = ads.findIndex(ad => ad.id === req.params.id);
  if (adIndex !== -1) {
    ads[adIndex] = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
    };
    writeAdsToFile(ads);
    res.redirect(`/ads/${req.params.id}`);
  } else {
    res.status(404).send('Ad not found');
  }
};

export const deleteAd = (req, res) => {
  const ads = readAdsFromFile();
  const newAds = ads.filter(ad => ad.id !== req.params.id);
  writeAdsToFile(newAds);
  res.redirect('/ads');
};

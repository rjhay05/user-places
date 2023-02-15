const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { getAllPlaces, getPlaceId, getPlacesByUserId, postPlace, patchPlace, deletePlace } = require('../controller/placesController');
const fileUpload = require('../middleware/file-upload');
const tokenAuth = require('../middleware/token-auth');


router.get('/', getAllPlaces);

router.get('/:pid', getPlaceId);

router.get('/user/:uid', getPlacesByUserId);

router.use(tokenAuth)

router.post('/',
    fileUpload.single('image'),
    [
        body('title').not().isEmpty(),
        body('description').isLength({ min: 5 }),
        body('image'),
        body('address').not().isEmpty()
    ],
    postPlace);

router.patch('/:pid',
        fileUpload.single('image'),
    [
        body('title').not().isEmpty(),
        body('description').isLength({ min: 5 }),
        body('address').not().isEmpty(),
    ],
    patchPlace);

router.delete('/:pid', deletePlace);

module.exports = router;
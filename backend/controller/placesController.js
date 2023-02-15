const { validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
const fs = require('fs');

const HttpError = require('../model/http-error');
const PlacesSchema = require('../model/PlacesSchema');
const UserSchema = require('../model/UsersSchema');


const getAllPlaces = async (req, res, next) => {
    let places;
    try {
        places = await PlacesSchema.find()
    } catch (err) {
        return next(new HttpError("Something went wrong, can't get places"), 500)
    }
    res.send(places)
}

const getPlaceId = async (req, res, next) => {

    let placeId = req.params.pid;
    let placeById;
    try {
        placeById = await PlacesSchema.findById(placeId)
        if (!placeById) {
            throw new HttpError('No place ID found', 404)
        }
    } catch (err) {
        return next(new HttpError("Something went wrong, can't find place by ID"), 500)
    }

    res.status(201).json({ placeById })
}

const getPlacesByUserId = async (req, res, next) => {

    let userId = req.params.uid;
    let userWithPlaces;
    try {
        userWithPlaces = await UserSchema.findById(userId).populate('places')
    } catch (err) {
        return next(new HttpError("Something went wrong, can't find place by user ID"), 500)
    }

    if (!userWithPlaces || userWithPlaces.length === 0) {
        return next(new HttpError('No user ID found', 404));
    }

    res.status(201).json(userWithPlaces.places);
}

const postPlace = async (req, res, next) => {
    const { title, description, address, creator } = req.body

    const createdPlace = new PlacesSchema({
        title,
        description,
        address,
        image: req.file.path,
        creator
    })

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Inputs must not be empty', 400));
    }

    let user;
    try {
        user = await UserSchema.findById(creator);
        if (!user) {
            return next(new HttpError('No user found'), 404)
        }
    } catch (err) {
        return next(new HttpError('Something went wrong', 500));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError("Something went wrong, can't creact a place"), 500)
    }

    res.send(createdPlace)
}

const patchPlace = async (req, res, next) => {
    const placeId = req.params.pid;
    const { title, description, address } = req.body;

    let place;
    try {
        const place = await PlacesSchema.findById(placeId)
        fs.unlink(place.image, err => console.log(err))
    } catch (err) {
        console.log(err)
    }

    try {
        const place = await PlacesSchema.findById(placeId)
        if(place.creator.toString() !== req.userData.userId){
            return next(new HttpError("You cannot edit this place"), 401)
        }
    } catch (error) {
        return next(new HttpError("Something went wrong, can't edit place"), 500)
    }


    try {
        place = await PlacesSchema.findByIdAndUpdate(placeId, {
            title,
            description,
            address,
            image: req.file.path
        });
    } catch (err) {
        return next(new HttpError("Something went wrong, can't find place by ID"), 500)
    }

    if (!place) {
        return next(new HttpError('No user ID found', 404));
    }

    res.json({ message: "Updated Successfully" })
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;

    try {
        const place = await PlacesSchema.findById(placeId)
        if(place.creator.toString() !== req.userData.userId){
            return next(new HttpError("You cannot delete this place"), 401)
        }
    } catch (error) {
        return next(new HttpError("Something went wrong, can't delete place"), 500)
    }

    try {
        place = await PlacesSchema.findByIdAndDelete(placeId).populate('creator');
        await place.creator.places.pull(place);
        await place.creator.save();
        fs.unlink(place.image, err => console.log(err))

    } catch (err) {
        return next(new HttpError("Something went wrong, can't delete place"), 500)
    }

    
    if (!place) {
        return next(new HttpError('No place found', 404));
    }

    res.json({ message: 'Deleted Successfully' })

}



module.exports = {
    getAllPlaces,
    getPlaceId,
    getPlacesByUserId,
    postPlace,
    patchPlace,
    deletePlace
}
var express = require('express');
var router = express.Router();
const Organization = require('../models/organizations');

router.post('/createOrganization', function (req, res, next) {
    const organization = new Organization(req.body);
    const promise = organization.save();
    promise.then((data) => {
        res.json({
            success: true,
        });
    }).catch((err) => {
        res.json({
            errorMessage: "Veri Kaydedilmedi"
        });
    });
});
router.post('/organizaionSubscribe/:id', function (req, res, next) {

    const promise = Organization.findOne({
        id: req.params.id
    });
    promise.then((data) => {
        var doc = data;
        console.log(doc.attendees.length);
        if (doc.closed == false) {
            if (doc.attendees.length == 25) {
                const promisee = Organization.updateOne({
                    id: req.params.id
                }, {
                    $set: {
                        closed: true
                    }

                }, );

                res.json({
                    errorMessage: "Grup Doldu"
                });

            } else {

                const promise = Organization.updateOne({
                    id: req.params.id
                }, {
                    $push: {
                        attendees: req.body
                    }
                });
                promise.then((data) => {
                    res.json({
                        isSucces: true
                    });
                }).catch((err) => {
                    res.json({
                        isSucces: false
                    });
                });
            };
        } else {
            var attendeesList = [];

            doc.attendees.forEach(element => {
                attendeesList.push(element.subscribe);
            });

            shuffle(attendeesList);
            console.log(attendeesList);
            var indexList = attendeesList.filter(word => indexList.indexOf(word) % 5 == 2);
            console.log(indexList);
            res.json({
                errorMessage: "Grup Doldu.."
            });
        }
    }).catch((err) => {
        res.json({
            errorMessage: "Kullanıcı Bulunamadı"
        });
    });

});

router.get('/all', function (req, res, next) {
    const promise = Organization.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            errorMessage: "Kullanıcı Bulunamadı"
        });
    });
});

router.get('/id/:id', function (req, res, next) {
    const promise = Organization.findOne({
        id: req.params.id
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            errorMessage: "Kullanıcı Bulunamadı"
        });
    });


});

function shuffle(arra1) {
    var ctr = arra1.length,
        temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


module.exports = router;
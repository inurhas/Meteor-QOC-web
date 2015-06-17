QocData = new Meteor.Collection('QocData');
/*checks to see if the current user making the request to update is the admin user */
function adminUser(userId) {
    var adminUser = Meteor.users.findOne({
        username: "admin"
    });
    return (userId && adminUser && userId === adminUser._id);
}
var getOneQoc = 
QocData.allow({
    insert: function (userId, doc) {
        return adminUser(userId);
    },
    update: function (userId, docs, fields, modifier) {
        return adminUser(userId);
    },
    remove: function (userId, docs) {
        return adminUser(userId);
    }
});
Meteor.publish("listOfQocFilter", function (limit) {
    return QocData.find({
        status: "Shared"
    }, {
        limit: limit
    }, {
        sort: {
            $natural: -1
        }
    });
});
Meteor.publish("listOfOwnQoc", function (username, qocCursor) {
    return QocData.find({
        owner: username
    }, {
        limit: 5,
        skip: qocCursor
    }, {
        sort: {
            $natural: -1
        }
    });
});
Meteor.startup(function () {
    // code to run on server at startup
    return Meteor.methods({
        removeAllPost: function () {
            return QocData.remove({});
        },
        addNewOption: function (idnya, optionform) {
            QocData.update({
                _id: idnya
            }, {
                $addToSet: {
                    options: {
                        option: optionform,
                        numselected: 0,
                        criterias: []
                    }
                }
            });
        },
        updateValueOption: function (idnya, optionform, criteriaForm, valueName, updateBtn) {
            if (updateBtn) {
                var qoc = QocData.findOne({
                    _id: idnya
                })
                var firstLevel = null;
                var secondLevel = null;
                var valueToUpdate = {};
                var optionToUpdate = {};
                if (qoc && qoc.options) {
                    for (var i = 0; i < qoc.options.length; i++) {
                        if (qoc.options[i].option == optionform) {
                            firstLevel = i
                            optionToUpdate["options." + i + ".option"] = optionform;
                            var opt = qoc.options[i]
                            if (opt.criterias) {
                                for (var j = 0; j < opt.criterias.length; j++) {
                                    if (opt.criterias[j].criteria == criteriaForm) {
                                        secondLevel = j;
                                        valueToUpdate["options." + i + ".criterias." + j + ".value"] = valueName;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                QocData.update({
                    _id: idnya
                }, {
                    $set: optionToUpdate
                })
                QocData.update({
                    _id: idnya
                }, {
                    $set: valueToUpdate
                })
            } else {
                QocData.update({
                    _id: idnya,
                    "options.option": optionform
                }, {
                    $addToSet: {
                        "options.$.criterias": {
                            criteria: criteriaForm,
                            value: valueName
                        }
                    }
                });
            }
        },
        addValueCriteria: function (idnya, optionform, criteriaInput) {
            QocData.update({
                _id: idnya,
                "options.option": optionform
            }, {
                $addToSet: {
                    "options.$.criterias": {
                        criteria: criteriaInput,
                        value: 0
                    }
                }
            });
        },
        updateValueCriteria: function (idnya, criteriaIdPosition, criteriaInput) {
            var qoc = QocData.findOne({
                _id: idnya
            })
            var criteriaToUpdate = {};
            if (qoc && qoc.options) {
                for (var i = 0; i < qoc.options.length; i++) {
                    var opt = qoc.options[i]
                    for (var j = 0; j < opt.criterias.length; j++) {
                        criteriaToUpdate["options." + i + ".criterias." + criteriaIdPosition + ".criteria"] = criteriaInput;
                        QocData.update({
                            _id: idnya
                        }, {
                            $set: criteriaToUpdate
                        })
                    }
                }
            }
        },
        deleteCriteria: function (idnya, criteriaId) {
            var qoc = QocData.findOne({
                _id: idnya
            })
            if (qoc && qoc.options) {
                for (var i = 0; i < qoc.options.length; i++) {
                    var option = qoc.options[i].option
                    QocData.update({
                        _id: idnya,
                        "options.option": option
                    }, {
                        $pull: {
                            "options.$.criterias": {
                                criteria: criteriaId
                            }
                        }
                    })
                }
            }
        },
        deleteOption: function (idnya, optionId) {
            QocData.update({
                _id: idnya
            }, {
                $pull: {
                    "options": {
                        option: optionId
                    }
                }
            })
        },
        updateQoc: function (idnya, qocQuestion, description, qocType, status, username) {
            QocData.update({
                _id: idnya
            }, {
                $set: {
                    qoc: qocQuestion,
                    description: description,
                    type: qocType,
                    owner: Meteor.user()
                        .username,
                    status: status
                }
            })
        },
        addNewQoc: function (qocQuestion, description, qocType, status) {
            QocData.insert({
                qoc: qocQuestion,
                description: description,
                duedate: new Date(),
                type: qocType,
                owner: Meteor.user()
                    .username,
                status: status,
                options: []
            })
        },
        removeQoc: function (idnya) {
            QocData.remove({
                _id: idnya
            })
        },
        numberOfAllOwnQoc: function (username) {
            return QocData.find({
                    owner: username
                })
                .count();
        },
        addNumSelected: function (idnya, optionName) {
            QocData.update({
                _id: idnya,
                "options.option": optionName
            }, {
                $inc: {
                    "options.$.numselected": 1
                }
            })
        }
    });
});

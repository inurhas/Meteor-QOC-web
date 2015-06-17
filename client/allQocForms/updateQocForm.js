Template.updateQocForm.enabled = function () {
    return Session.get('inputEnabled')
}
Template.updateQocForm.events({
    'click .update': function (evt, tmpl) {
        var qocQuestion = tmpl.find('.qocQuestion')
            .value
        var description = tmpl.find('.description')
            .value
        var qocType = tmpl.find('.type')
            .value
        var status = tmpl.find('.status')
            .value
        var sameQocName = checkSameQoc(qocQuestion);
        if (sameQocName == true && Session.get('inputEnabled') == 'enabled') {
            alert('QOC ist already exist, please give another name')
        } else {
            updateQoc(qocQuestion, description, qocType, status)
            Session.set('updateQocForm', false);
            Session.set('addQoc', false);
            Session.set('inputEnabled', false);
        }
    },
    'click .cancel': function (evt, tmpl) {
        Session.set('updateQocForm', false);
        Session.set('addQoc', false);
        Session.set('inputEnabled', false);
    },
    'click .save': function (evt, tmpl) {
        var qocQuestion = tmpl.find('.qocQuestion')
            .value
        var description = tmpl.find('.description')
            .value
        var qocType = tmpl.find('.type')
            .value
        var status = tmpl.find('.status')
            .value
        var sameQocName = checkSameQoc(qocQuestion);
        if (sameQocName == true || qocQuestion == '') {
            alert('QOC Qustion is already exist or it is Empty')
        } else {
            Meteor.call("addNewQoc", qocQuestion, description, qocType, status)
            Session.set('updateQocForm', false);
            Session.set('addQoc', false);
            Session.set('inputEnabled', false);
        }
    },
    'change input[type=checkbox].checkboxEditQocName': function (evt, tmpl) {
        if (Session.get('inputEnabled') == false) {
            Session.set('inputEnabled', true);
        } else {
            Session.set('inputEnabled', false);
        }
    }
})
Template.updateQocForm.addQoc = function () {
    return Session.get('addQoc')
}
Template.updateQocForm.qocData = function () {
    return findOneQocOnCollection()
}
Template.updateQocForm.sharedStatusJa = function () {
    var sharedStatus = false
    var sharedStatusJa = QocData.findOne({
        _id: Session.get('idData'),
        status: 'Shared'
    });
    if (sharedStatusJa) {
        sharedStatus = true
    }
    return sharedStatus
}

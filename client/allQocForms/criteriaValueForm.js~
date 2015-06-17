Template.criteriaValue.events({
    'click .save': function (evt, tmpl) {
        var listOpt = Session.get('listOpt')
        var criteriaInput = tmpl.find('.criteriaInput').value;
        if (criteriaInput != '') {
            var checkSameChrit = QocData.findOne({_id: Session.get('idData'),"options.0.criterias.criteria": criteriaInput})
            if (checkSameChrit == null) {
                for (var i = 0; i < listOpt.length; i++) {
                    updateCriteria(listOpt[i].option, criteriaInput);
                }
                Session.set('showCriteriaInput', false);
                Session.set('newCriteria', false);
            } else {
                alert('Criteria is already exist, please Select to update it')
            }
        } else {
            alert('Criteria is Empty')
        }
    },
    'click .cancel': function (evt, tmpl) {
        Session.set('showCriteriaInput', false);
        Session.set('newCriteria', false);
    },
    'click .update': function (evt, tmpl) {
        var listOpt = Session.get('listOpt')
        var criteriaId = Session.get('criteriaId');
        var criteriaInput = tmpl.find('.criteriaInput').value;
        if (criteriaInput != '') {
            var checkSameChrit = QocData.findOne({_id: Session.get('idData'),"options.0.criterias.criteria": criteriaInput})
            if (checkSameChrit == null) {
              for (var i = 0; i < QocData.findOne({_id: Session.get('idData')}).options[0].criterias.length; i++) {
                if (QocData.findOne({_id: Session.get('idData')}).options[0].criterias[i].criteria == criteriaId) {
                    Meteor.call('updateValueCriteria', Session.get('idData'), i, criteriaInput)
                    Session.set('showCriteriaInput', false);
                    Session.set('newCriteria', false);
                    break
                } else {
                    Session.set('newCriteria', true);
                }}
            } else {
                alert('Criteria is already exist, please choose another name')
            }
        } else {
            alert('Criteria is Empty')
        }
    }
});
Template.criteriaValue.newCriteria = function () {
    return Session.get('newCriteria');
}
Template.criteriaValue.criteriaToUpdate = function () {
    return Session.get('criteriaId');
}
var updateCriteria = function (optionform, criteriaInput) {
    Meteor.call("addValueCriteria", Session.get('idData'), optionform, criteriaInput);
}

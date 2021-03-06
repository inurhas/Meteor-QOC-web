Template.deleteCriteriaForm.events({
    'click .delete': function (evt, tmpl) {
        Meteor.call("deleteCriteria", Session.get('idData'), Session.get('criteriaId'));
        Session.set('deleteCriteriaForm', false);
        Session.set('criteriaId', null);
    },
    'click .cancel': function (evt, tmpl) {
        Session.set('deleteCriteriaForm', false);
        Session.set('criteriaId', null);
    }
})
Template.deleteCriteriaForm.criteria = function () {
    return Session.get('criteriaId');
}


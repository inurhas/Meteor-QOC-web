Template.deleteOptionForm.events({
    'click .delete': function (evt, tmpl) {
        Meteor.call("deleteOption", Session.get('idData'), Session.get('optionId'))
        Session.set('deleteOptionForm', false)
        Session.set('optionId', null)
    },
    'click .cancel': function (evt, tmpl) {
        Session.set('deleteOptionForm', false)
        Session.set('optionId', null)
    }
});

Template.deleteOptionForm.Option = function () {
    return Session.get('optionId');
}

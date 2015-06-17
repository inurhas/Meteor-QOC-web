Template.deleteQocForm.events({
    'click .delete': function () {
        Session.set('deleteQocForm', false);
        Meteor.call('removeQoc', Session.get('idData'))
        //        Session.set('idData',null);
    },
    'click .cancel': function () {
        Session.set('deleteQocForm', false);
        //        Session.set('idData',null);
    }
})
Template.deleteQocForm.qoc = function () {
    var b = findOneQocOnCollection()
    if (!b) return '';
    return (b.qoc)
}

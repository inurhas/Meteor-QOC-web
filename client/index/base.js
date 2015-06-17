//define application name
Template.header.appName = function () {
    return Session.get('appName');
}
Template.header.events({
//  this keyup can we use to change btn-search, so user can find what he search just with typing
//  'keyup .search': function() {
//       Session.set("search_query", $(".search").val());
//  }
    'click .btn-search': function () {
        Session.set("search_query", $(".search")
            .val());
        //        alert($(".search").val())
        Session.set('searchButton', true)
    },
    'click .btn-cancelSearch': function () {
        $('.search')
            .val('');
        Session.set('searchButton', false)
        Session.set("search_query", '');
    }
});
//  
Template.header.searchButton = function () {
    return Session.get('searchButton')
}
Template.sidebarbutton.userlogin = function () {
    return onlogout()
}

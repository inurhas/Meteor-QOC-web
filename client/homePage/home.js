Template.home.userlogin = function () {
    return onlogout()
}
Template.home.isOptionsMoreThanOne = function(selectedOptions){
    if (selectedOptions.length > 1 && selectedOptions[0].criterias.length > 0){
        return true
    }
}
Template.home.qocList = function () {
    postsHandle = Meteor.subscribeWithPagination("listOfQocFilter", 10);
    if (Session.get('searchButton') == true && Session.get('search_query') != '') {
        var selectedData = searchQocBasedOn3Element()
        return selectedData
    } else {
        return QocData.find({
            status: "Shared"
        })
    }
}
Template.home.helpers({
    posts: function () {
        return QocData.find({}, {
            sort: {submitted: -1},
            limit: postsHandle.limit()
        })
    },
    postsReady: function () {
        return !postsHandle.loading();
    },
    allPostsLoaded: function () {
        if (Session.get('searchButton') == true && Session.get('search_query') != '') {
            return !postsHandle.loading() && 
                searchQocBasedOn3Element()
                .count() < postsHandle.loaded();
        } else {
            return !postsHandle.loading() &&
                QocData.find()
                .count() < postsHandle.loaded();
        }
    }
});
Template.home.events({
    'click .sidebarnya': function () {
        $(this)
            .toggleClass('visible-xs text-center');
        $(this)
            .find('i')
            .toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
        $('.row-offcanvas')
            .toggleClass('active');
        $('#lg-menu')
            .toggleClass('hidden-xs')
            .toggleClass('visible-xs');
        $('#xs-menu')
            .toggleClass('visible-xs')
            .toggleClass('hidden-xs');
        $('#btnShow')
            .toggle();
    },
    'click .logoutsidebar': function (event, template) {
        event.preventDefault();
        Session.set('qocCursor', 0)
        Meteor.logout(function (error) {
            if (error) {
                // Display the logout error to the user however you want
            }
        });
    },
    'click .start': function () {
//       alert(JSON.stringify(this._id, null, 4))
        Session.set('idData', this._id);
        Session.set('startCountForm', true);
    },
    'click .load-more': function (evt) {
        evt.preventDefault();
        postsHandle.loadNextPage();
    }
});
Template.home.startCountShowForm = function () {
    return Session.get('startCountForm')
}
Template.home.showResult = function () {
    return Session.get('showResult')
}
var searchQocBasedOn3Element = function (){
    return QocData.find({
            $and: [{status: "Shared"},
                   {$or:[{qoc: {$regex: Session.get("search_query")}},
                         {type: {$regex: Session.get("search_query")}},
                         {owner: {$regex: Session.get("search_query")}
                    }]
                }]
        });
}

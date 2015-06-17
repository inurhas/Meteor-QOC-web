//function to read QOC collection with specific owner of database and show in template myqoc
Template.myqoc.userlogin = function () {
    return onlogout()
}
Template.myqoc.qocListOwner = function () {
    Meteor.subscribe("listOfOwnQoc", username(), Session.get('qocCursor'));
    if (Session.get('searchButton') == true && Session.get('search_query') != '') {
        var selectedData = QocData.find({
            $and: [{owner: username()},
                   {$or: [{qoc: {$regex: Session.get("search_query")}},
                          {type: {$regex: Session.get("search_query")}
                    }]
            }]
        });
        searchCount = selectedData.count()
        Session.set('postCount', searchCount)
        return selectedData
    } else {
        Meteor.call("numberOfAllOwnQoc", username(), function (err, count) {
            Session.set('postCount', count)
        })
        return QocData.find({
            owner: username()
        })
    }
}
//all events and logic on template myqoc
Template.myqoc.deleteQocShowForm = function () {
    return Session.get('deleteQocForm');
}
Template.myqoc.deleteOptionShowForm = function () {
    return Session.get('deleteOptionForm')
}
Template.myqoc.deleteCriteriaShowForm = function () {
    return Session.get('deleteCriteriaForm')
}
Template.myqoc.updateQocShowForm = function () {
    return Session.get('updateQocForm')
}
Template.myqoc.startCountShowForm = function () {
    return Session.get('startCountForm')
}
Template.myqoc.events({
    'click .addqoc': function () {
        Session.set('addQoc', true)
        Session.set('updateQocForm', true);
    },
    'keyup .search': function () {
        Session.set("search_query", $(".search")
            .val());
    },
    'click .previous': function (evt, tmpl) {
        if (Number(Session.get('qocCursor')) > 4) {
            Session.set('qocCursor', Number(Session.get('qocCursor')) - 5);
        }
    },
    'click .next': function (evt, tmpl) {
        Session.set('qocCursor', Number(Session.get('qocCursor')) + 5);
    },
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
        Meteor.logout(function (error) {
            if (error) {
                // Display the logout error to the user however you want
            }
        });
    }
});
Template.myqoc.nextText = function () {
    return (Number(Session.get('qocCursor')) + 5) + " - " + (Number(Session.get('qocCursor')) + 10)
}
Template.myqoc.previousText = function () {
    if (Number(Session.get('qocCursor')) < 4) {
        return "";
    } else {
        return (Number(Session.get('qocCursor')) - 5) + " - " + (Number(Session.get('qocCursor')))
    }
}
Template.myqoc.morePrevious = function () {
    if (Number(Session.get('qocCursor')) > 0) {
        return true
    } else {
        Session.set('postCount', 0);
        return false
    }
}
Template.myqoc.numberOfAllOwnQoc = function () {
    if ((Number(Session.get('qocCursor')) + 5) >= Number(Session.get('postCount'))) {
        return false
    } else {
        return true
    }
}
Template.myqoc.showOptionValue = function () {
    return Session.get('showOptionValue');
}
Template.myqoc.showCriteriaInput = function () {
    return Session.get('showCriteriaInput');
}
Template.myqoc.showResult = function () {
    return Session.get('showResult');
}

//define userlogin input
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
})
username = function () {
    var user = Meteor.user();
    var usernameLogin = null
    if (user) {
        usernameLogin = user.username;
    }
    return usernameLogin
}
checkSameQoc = function (qocInput) {
    var selectedQoc = QocData.findOne({
        qoc: qocInput
    })
    if (selectedQoc) {
        return true
    } else {
        return false
    }
}
updateQoc = function (qocQuestion, description, qocType, status) {
    Meteor.call("updateQoc", Session.get('idData'), qocQuestion, description, qocType, status)
}
findOneQocOnCollection = function(){
    return QocData.findOne({
        _id: Session.get('idData')
    })
}
findAllInfoOfQocOnCollection = function(){
    return QocData.find({
        _id: Session.get('idData')
    });
}
getListCriteria = function () {
    var a = findOneQocOnCollection()
    if (a && a.options.length > 0) {
        for (var i = 0; i < a.options.length; i++) {
            if (a.options[i].option == Session.get('optionId')) {
                var b = a.options[i].criterias
            }
        }
        if (!b) {
            var b = a.options[0].criterias
        }
    } else {
        b = null
    }
    if (b) {
        Session.set('lengthChar', b.length);
        Session.set('chrit', b);
        for (var i = 0; i < Session.get('lengthChar'); i++) {
            b[i].index = i
        }
    }
//    alert(JSON.stringify(b, null, 4))
    return b;
}
dbUpdate = function (evt, tmpl, updateBtn) {
    var InputCorrect = true
    var optionform = Session.get('optionId');
    var chritlist = Session.get('chrit');
    var firstOption = false
    if (findOneQocOnCollection().options.length == 0) {
        firstOption = true
    }
    if (!updateBtn) {
        optionform = tmpl.find('.optionform')
            .value;
        InputCorrect = addOption(optionform);
    }
    if (InputCorrect) {
        if (!firstOption) {
            for (var i = 0; i < Session.get('lengthChar'); i++) {
                if (chritlist[i].criteria) {
                    var criteriaForm = chritlist[i].criteria;
                    var charval = '.' + 'value' + '_' + i;
                    var valueName = tmpl.find(charval).value
                    updateOptionValue(optionform, criteriaForm, valueName, updateBtn);
                }
            }
        }
    } else {
        inputCorrect = false
    }
    return InputCorrect
}
onlogout = function () {
    var user = Meteor.user();
    if (user == null) {
        return false
    } else {
        return true
    }
}
addOption = function (optionform) {
    var InputCorrect = QocData.findOne({
        _id: Session.get('idData'),
        "options.option": optionform
    })
    if (InputCorrect) {
        return false
    } else {
        Meteor.call('addNewOption', Session.get('idData'), optionform);
        return true
    }
}
updateOptionValue = function (optionform, criteriaForm, valueName, updateBtn) {
    Meteor.call("updateValueOption", Session.get('idData'), optionform, criteriaForm, valueName, updateBtn);
}
countQoc = function (userInput) {
    var optionAndValue = {}
    var optionName = []
    var result = []
    var selectedQoc = findOneQocOnCollection()
    if (selectedQoc) {
        for (var i = 0; i < selectedQoc.options.length; i++) {
            optionAndValue[selectedQoc.options[i].option] = []
            for (var j = 0; j < selectedQoc.options[i].criterias.length; j++) {
                optionAndValue[selectedQoc.options[i].option][j] = selectedQoc.options[i].criterias[j].value
            }
            optionName[i] = selectedQoc.options[i].option
        }
    }
    for (var l = 0; l < optionName.length; l++) {
        var totalValueOfOneOption = null
        for (var k = 0; k < userInput.length; k++) {
            var oneCriteria = userInput[k] * optionAndValue[optionName[l]][k]
            totalValueOfOneOption = totalValueOfOneOption + oneCriteria
        }
        result[l] = {
            "label": optionName[l],
            "value": totalValueOfOneOption
        }
    }
    var sortedResul = sortingResult(result)
    Meteor.call("addNumSelected", Session.get('idData'), sortedResul[0].label)
    Session.set('resultQoc', sortedResul);
}
sortingResult = function (dataToSorting) {
    return dataToSorting.sort(function (firstValue, nextValue) {
            return firstValue.value - nextValue.value;
        })
        .reverse()
}
curPath = function () {
        var c = window.location.pathname;
        var b = c.slice(0, -1);
        var a = c.slice(-1);
        if (b == "") {
            return "/"
        } else {
            if (a == "/") {
                return b;
            } else {
                return c;
            }
        }
}
//all registerHelper
Handlebars.registerHelper('active', function (path) {
    return curPath() == path ? 'active' : '';
})
Handlebars.registerHelper('formatDate', function (datetime) {
    if (moment) {
        return moment(datetime)
            .format("DD/MM/YYYY");
    } else {
        return datetime;
    }
})

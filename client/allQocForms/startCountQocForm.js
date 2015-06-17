Template.startCountQoc.valueList = function () {
    var listOfCriteria = getListCriteria()
    return listOfCriteria
}
Template.startCountQoc.Question = function () {
    return findOneQocOnCollection().qoc
}
Template.startCountQoc.events({
    'click .analyse': function (evt, tmpl) {
        var userInput = []
        Session.set('startCountForm', false)
//       alert(JSON.stringify(Session.get('chrit'), null, 4))
        for (var i = 0; i < Session.get('chrit')
            .length; i++) {
            var valueName = null
            var charval = '.' + 'value' + '_' + i;
            valueName = tmpl.find(charval)
                .value
            if (valueName == null || valueName == '') {
                valueName = 0
            }
            userInput[i] = valueName
        }
//       alert(JSON.stringify(userInput, null, 4))
        countQoc(userInput) //this function from globalFunction
        Session.set('startCountForm', false)
        Session.set('showResult', true)
    },
    'click .cancel': function (evt, tmpl) {
        Session.set('startCountForm', false)
    }
});
Template.userCriteria.rendered = function (){
    for (var i = 0; i < Session.get('chrit')
            .length; i++) {
            var charval = '.' + 'value' + '_' + i;
            var sliderValue = '.' + 'sliderValue' + '_' + i;
            $(charval).slider()
        }
}

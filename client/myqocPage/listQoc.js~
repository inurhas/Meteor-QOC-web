//all events and logic on template listQoc
Template.listQoc.qocListOwner = function () {
    return findAllInfoOfQocOnCollection()
}
Template.listQoc.isOptionsMoreThanOne = function(lengthOptions){
    if (lengthOptions>1){
        return true
    }
}
Template.listQoc.isOptionsMoreThanOneCriteriaNotNull = function(selectedOptions){
    if (selectedOptions.length > 1 && selectedOptions[0].criterias.length > 0){
        return true
    }
}
Template.listQoc.events({
    'click .listId': function (evt, tmpl) {
        Session.set('idData', tmpl.data._id);
    },
    'click .addOptionForm': function () {
        Session.set('optionId', null);
        Session.set('showOptionValue', true);
    },
    'click .addCriteriaForm': function () {
        Session.set('showCriteriaInput', true);
        Session.set('newCriteria', true);
    },
    'click .delete': function (evt, tmpl) {
        Session.set('idData', tmpl.data._id);
        Session.set('deleteQocForm', true);
    },
    'click .editQoc': function (evt, tmpl) {
        Session.set('idData', tmpl.data._id);
        Session.set('updateQocForm', true);
    },
    'click .start': function (evt, tmpl) {
        Session.set('idData', tmpl.data._id);
        Session.set('startCountForm', true);
    },
    'click .statistic': function (evt, tmpl) {
        statisticOptions()
    }
})
Template.listQoc.qocListCriteria = function () {
    var qocDataSelected = findOneQocOnCollection()
    var listOfCriteriaFromOption = null;
    if (qocDataSelected && qocDataSelected.options.length > 0) {
        listOfCriteriaFromOption = qocDataSelected.options[0].criterias;
        Session.set('listOpt', qocDataSelected.options)
    } else {
        Session.set('listOpt', null)
    }
    return listOfCriteriaFromOption
}
Template.listQoc.qocListOption = function () {
    var selectedQoc = findOneQocOnCollection()
    if (selectedQoc) {
        var listOfOptions = selectedQoc.options;
    } else {
        var listOfOptions = [];
    }
    return listOfOptions
}
Template.listQoc.checkOptionNull = function () {
    var selectedQoc = findOneQocOnCollection()
    if (selectedQoc && selectedQoc.options) {
        if (selectedQoc.options.length == 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
Template.listQoc.graphOptions = function () {
    statisticOptions()
}
var statisticOptions = function () {
    var optionResult = []
    var selectedQocForGraph = findOneQocOnCollection()
    if (selectedQocForGraph) {
        var options = selectedQocForGraph.options;
    } else {
        var options = [];
    }
    for (var i = 0; i < options.length; i++) {
        optionResult[i] = {
            "label": options[i].option,
            "value": options[i].numselected
        }
    }
    var idStatisticName = '#stat_' + String(Session.get('idData')) + ' svg'
    nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
            .x(function (d) {
                return d.label
            }) //Specify the data accessors.
            .y(function (d) {
                return d.value
            })
            //                .showXAxis(false)
            .margin({
                left: 20,
                right: 20
            })
            .staggerLabels(true) //Too many bars and not enough room? Try staggering labels.
            .tooltips(false) //Don't show tooltips
            .showValues(true) //...instead, show the bar value right on top of each bar.
            .transitionDuration(350);
        var svgLoad = d3.select(idStatisticName)
            .datum(exampleData())
            .call(chart);
        //            var makeLegend = nv.models.legend()            //initialize legend function
        //                .key(function(d) { return d.label; });    //tell the function which property to use as text
        //            //add a group to hold legend, position as necessary
        //            svgLoad.append("g").attr("class", "legend")    //(no positioning will draw legend across top of SVG)
        //                               .datum(exampleData()[0].values)     //set data to the array of objects you want 
        //                                                             //included in the legend
        //                               .transition().duration(500)
        //                               .call(makeLegend);
        //            nv.utils.windowResize(makeLegend);
        nv.utils.windowResize(chart.update);
        return chart;
    });

    function exampleData() {
        return [{
            key: "Cumulative Return",
            values: optionResult
                    }]
    }
}
//for template optionlist in listQoc
Template.optionlist.events({
    'click .optionlist': function (evt, tmpl) {
        Session.set('updateOptionbtn', true);
        Session.set('optionId', tmpl.data.option);
        Session.set('newOption', false);
        Session.set('showOptionValue', true);
    },
    'click .deleteOption': function (evt, tmpl) {
        Session.set('optionId', tmpl.data.option)
        Session.set('deleteOptionForm', true)
    }
});
//for template qocAllCriteria in listQoc
Template.qocAllCriteria.events({
    'click .criterialist': function (evt, tmpl) {
        Session.set('showCriteriaInput', true);
        Session.set('criteriaId', tmpl.data.criteria);
    },
    'click .deleteCriteria': function (evt, tmpl) {
        Session.set('criteriaId', tmpl.data.criteria);
        Session.set('deleteCriteriaForm', true);
    }
})


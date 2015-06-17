Template.result.events({
    'click .cancel': function (evt, tmpl) {
        Session.set('showResult', false);
//        Session.set('resultQoc',null);
    }
})
Template.result.rendered = function () {
    nv.addGraph(function () {
        var chart = nv.models.pieChart()
            .x(function (d) {
                return d.label
            })
            .y(function (d) {
                return d.value
            })
            .showLabels(true);
        d3.select("#chart svg")
            .datum(Session.get('resultQoc'))
            .transition()
            .duration(350)
            .call(chart);
        return chart;
    });
    var widthSVG = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (widthSVG > 1000) {
        var chrt = $("#chrt")
            //                             chrt.attr("width", "400px");
            //                             chrt.attr("height", "400px");
            //            chrt.attr("preserveAspectRatio", "xMinYMin meet")
        var setSvgViewBox = document.getElementsByTagName("svg")[0];
        setSvgViewBox.setAttribute("viewBox", "0 0 550 550");
    } else {
        var chrt = $("#chrt"),
            viewboxsize = "0 0 " + (0.8 * widthSVG) + " " + (0.8 * widthSVG);
        var setSvgViewBox = document.getElementsByTagName("svg")[0];
        setSvgViewBox.setAttribute("viewBox", viewboxsize);
        chrt.attr("width", widthSVG);
        chrt.attr("height", widthSVG);
    }
}
Template.result.Question = function () {
    return findOneQocOnCollection().qoc
}
Template.result.resultOfAnalyse = function () {
    return Session.get('resultQoc')
}


function initDiagram(states, transes) {

}

function points2DPropAbs(x0, y0, x1, y1, x2, y2, x3, y3) {
    return (
        "M " +
        x0 +
        "," +
        y0 +
        " C " +
        x1 +
        "," +
        y1 +
        " " +
        x2 +
        "," +
        y2 +
        " " +
        x3 +
        "," +
        y3
    );
}

function dProp2Points(dProp) {

}

function props2AbsC(dom) {
    dom.setAttribute(
        "d",
        points2AbsC(
            dom.getAttribute("x0"),
            dom.getAttribute("y0"),
            dom.getAttribute("x1"),
            dom.getAttribute("y1"),
            dom.getAttribute("x2"),
            dom.getAttribute("y2"),
            dom.getAttribute("x3"),
            dom.getAttribute("y3")
        )
    );
}

function dragState(d3) {
    var dx, dy;
    return d3
        .drag()
        .on("start", function() {
            var current = d3.select(this);
            dx = current.attr("x") - d3.event.x;
            dy = current.attr("y") - d3.event.y;

            var bz = d3.select("#state-grp");
        })
        .on("drag", function() {
            d3.select(this)
                .attr("x", d3.event.x + dx)
                .attr("y", d3.event.y + dy);
        });
}

function dragTrans(d3) {
    var dx, dy;
    return d3
        .drag()
        .on("start", function() {
            var current = d3.select(this);
            dx = current.attr("x") - d3.event.x;
            dy = current.attr("y") - d3.event.y;

            var bz = d3.select("#state-grp");
        })
        .on("drag", function() {
            d3.select(this)
                .attr("x", d3.event.x + dx)
                .attr("y", d3.event.y + dy);
        });
}
// import { distanceToCurve } from "./bezier.js";

const D_PROP_REGEX = /M\s+([\-\d\.]+),([\-\d\.]+)\s+C\s+([\-\d\.]+),([\-\d\.]+)\s+([\-\d\.]+),([\-\d\.]+)\s+([\-\d\.]+),([\-\d\.]+)/g;

function initDiagram(states, transes, d3) {
    // const str = "M 8.0252444,116.25594 C 120.28787,77.534661 204.037,150.4061 285.64686,116.25594";
    // var result = dProp2Points(str);
    // console.log(result);

    // for (var state of states) {}
    // for (var trans of transes) {}
    var pathDom = d3.select("#trans-path");
    applyToPointsProp(pathDom);
}

function applyToDProp(pathDom) {
    var dProp = points2DPropAbs(
        pathDom.attr("x0"),
        pathDom.attr("y0"),
        pathDom.attr("x1"),
        pathDom.attr("y1"),
        pathDom.attr("x2"),
        pathDom.attr("y2"),
        pathDom.attr("x3"),
        pathDom.attr("y3"), );
    pathDom.attr("d", dProp);
}

function applyToPointsProp(pathDom) {
    var points = dProp2Points(pathDom.attr("d"));
    pathDom.attr("x0", points[0]);
    pathDom.attr("y0", points[1]);
    pathDom.attr("x1", points[2]);
    pathDom.attr("y1", points[3]);
    pathDom.attr("x2", points[4]);
    pathDom.attr("y2", points[5]);
    pathDom.attr("x3", points[6]);
    pathDom.attr("y3", points[7]);
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
    var matches = dProp.matchAll(D_PROP_REGEX);
    var result = new Array(8);
    for (var match of matches) {
        //console.log(match);
        for (var i = 0; i < 8; i++) {
            result[i] = match[i + 1];
        }
        break;
    }
    return result;
}

// function props2AbsC(dom) {
//     dom.setAttribute(
//         "d",
//         points2AbsC(
//             dom.getAttribute("x0"),
//             dom.getAttribute("y0"),
//             dom.getAttribute("x1"),
//             dom.getAttribute("y1"),
//             dom.getAttribute("x2"),
//             dom.getAttribute("y2"),
//             dom.getAttribute("x3"),
//             dom.getAttribute("y3")
//         )
//     );
// }

function dragState(d3) {
    var dx, dy;
    return d3
        .drag()
        .on("start", function() {
            var current = d3.select(this);
            dx = current.attr("x") - d3.event.x;
            dy = current.attr("y") - d3.event.y;
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

            // console.log((d3.event.x - current.attr("x")) + ", " + (d3.event.y - current.attr("y")));

            var curve = d3.select("#trans-path");
            var ponits = dProp2Points(curve.attr("d"));
            var dist = distanceToCurve(
                ponits[0] + current.attr("x"),
                ponits[1] + current.attr("y"),
                ponits[2] + current.attr("x"),
                ponits[3] + current.attr("y"),
                ponits[4] + current.attr("x"),
                ponits[5] + current.attr("y"),
                ponits[6] + current.attr("x"),
                ponits[7] + current.attr("y"),
                d3.event.x - current.attr("x"),
                d3.event.y - current.attr("y")
            );
            console.log(dist);
        })
        .on("drag", function() {
            d3.select(this)
                .attr("x", d3.event.x + dx)
                .attr("y", d3.event.y + dy);
        });
}

function dragTrans0(d3) {
    var dx, dy;
    return d3
        .drag()
        .on("start", function() {
            var current = d3.select(this);
            dx = current.attr("x") - d3.event.x;
            dy = current.attr("y") - d3.event.y;
        })
        .on("drag", function() {
            d3.select(this)
                .attr("x", d3.event.x + dx)
                .attr("y", d3.event.y + dy);
        });
}
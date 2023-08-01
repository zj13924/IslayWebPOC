import { RectF } from "./classes.js";
import { PointF } from "./classes.js";

export function getParamT(x0, y0, x1, y1, x2, y2, x3, y3, x, y, threshold) {
    var paras = distanceToCurve(x0, y0, x1, y1, x2, y2, x3, y3, x, y);
    var distance = paras[0];
    var t = paras[1];
    return (distance <= threshold && t > 0.02 && t < 0.98 ? t : -1);
}

export function distanceToCurve(x0_, y0_, x1_, y1_, x2_, y2_, x3_, y3_, x0, y0) {
    var pointList = getDivPointList(x0_, y0_, x1_, y1_, x2_, y2_, x3_, y3_, 12);
    console.log(pointList);
    var rf = new RectF();
    var minDistance = 10000000;
    var minIndex = 0;
    var xq_ = 0,
        yq_ = 0;
    var xq = 0,
        yq = 0;
    for (var i = 0; i < pointList.length - 1; i++) {
        var distance = 0;
        var x1 = pointList[i].x;
        var y1 = pointList[i].y;
        var x2 = pointList[+i + 1].x;
        var y2 = pointList[+i + 1].y;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var x3 = -(dx * dy * y1 - dx * dy * y0 - dy * dy * x1 - dx * dx * x0) / (+dy * dy + dx * dx);
        var y3 = (+dx * dx * y1 + dy * dy * y0 - dx * dy * x1 + dx * dy * x0) / (+dy * dy + dx * dx);
        rf.set(Math.min(x1, x2), Math.min(y1, y2), +Math.max(x1, x2) + 1, +Math.max(y1, y2) + 1);
        if (rf.containsP(x3, y3)) {
            distance = getDistance(x0, y0, x3, y3);
            xq_ = x3;
            yq_ = y3;
        } else {
            var disA = getDistance(x0, y0, x1, y1);
            var disB = getDistance(x0, y0, x2, y2);
            xq_ = (disA < disB ? x1 : x2);
            yq_ = (disA < disB ? y1 : y2);
            distance = Math.min(disA, disB);
        }
        if (distance < minDistance) {
            minDistance = distance;
            minIndex = i;
            xq = xq_;
            yq = yq_;
        }
    }
    var pointA = pointList[minIndex];
    var pointB = pointList[+minIndex + 1];
    var tA = 1 / (pointList.length - 1) * minIndex;
    var tB = 1 / (pointList.length - 1) * (+minIndex + 1);
    var t = +tA + (tB - tA) * getDistance(pointA.x, pointA.y, xq, yq) /
        getDistance(pointA.x, pointA.y, pointB.x, pointB.y);
    t = (t <= 0 ? 0 : t);
    t = (t >= 1 ? 1 : t);
    return new Array(getDistance(x0, y0, xq, yq), t);
}

export function getDivPointList(x0, y0, x1, y1, x2, y2, x3, y3, divs) {
    var pointList = new Array(+divs + 1);
    for (var i = 0; i < divs; i++) {
        var t = 1 / divs * i;
        var x4 = divide(x0, x1, t);
        var y4 = divide(y0, y1, t);
        var x5 = divide(x1, x2, t);
        var y5 = divide(y1, y2, t);
        var x6 = divide(x2, x3, t);
        var y6 = divide(y2, y3, t);
        var x7 = divide(x4, x5, t);
        var y7 = divide(y4, y5, t);
        var x8 = divide(x5, x6, t);
        var y8 = divide(y5, y6, t);
        var x9 = divide(x7, x8, t);
        var y9 = divide(y7, y8, t);
        pointList[i] = new PointF(x9, y9);
    }
    pointList[divs] = new PointF(x3, y3);
    return pointList;
}

export function getDistance(x0, y0, x1, y1) {
    return +Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

export function divide(a, b, t) {
    console.log(a + ", " + b + ", " + t);
    return +a + (b - a) * t;
}
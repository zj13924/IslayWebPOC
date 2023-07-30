import { RectF } from "./class";
import { PointF } from "./class";

function points2AbsC(x0, y0, x1, y1, x2, y2, x3, y3) {
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
    .on("start", function () {
      var current = d3.select(this);
      dx = current.attr("x") - d3.event.x;
      dy = current.attr("y") - d3.event.y;

      var bz = d3.select("#state-grp");
    })
    .on("drag", function () {
      d3.select(this)
        .attr("x", d3.event.x + dx)
        .attr("y", d3.event.y + dy);
    });
}

function dragTrans(d3) {
  var dx, dy;
  return d3
    .drag()
    .on("start", function () {
      var current = d3.select(this);
      dx = current.attr("x") - d3.event.x;
      dy = current.attr("y") - d3.event.y;

      var bz = d3.select("#state-grp");
    })
    .on("drag", function () {
      d3.select(this)
        .attr("x", d3.event.x + dx)
        .attr("y", d3.event.y + dy);
    });
}

function getParamT(x0, y0, x1, y1, x2, y2, x3, y3, x,  y,  threshold)
{
 paras =         distanceToCurve(x0, y0, x1, y1, x2, y2, x3, y3, x, y);
 distance = paras[0];
 t = paras[1];
return (distance <= threshold  && t > 0.02 && t < 0.98 ? t : -1);
}

function distanceToCurve(x0_, y0_, x1_, y1_, x2_, y2_, x3_, y3_, x0,  y0){
    PointF[] pointList = getDivPointList(x0_, y0_, x1_, y1_, x2_, y2_, x3_, y3_, 12);
    RectF rf = new RectF();
    [] distanceAndT = new [2];
     minDistance = .MAX_VALUE;
     minIndex = 0;
     xq_ = 0, yq_ = 0;
     xq = 0, yq = 0;
    for ( i = 0; i < pointList.length - 1; i++)
    {
         distance = 0;
         x1 = pointList[i].x;
         y1 = pointList[i].y;
         x2 = pointList[i + 1].x;
         y2 = pointList[i + 1].y;
         dx = x2 - x1;
         dy = y2 - y1;
         x3 = -(dx * dy * y1 - dx * dy * y0 - dy * dy * x1 - dx * dx * x0) / (dy * dy + dx * dx);
         y3 = (dx * dx * y1 + dy * dy * y0 - dx * dy * x1 + dx * dy * x0) / (dy * dy + dx * dx);
        rf.set(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2) + 1, Math.max(y1, y2) + 1);
        if (rf.contains(x3, y3))
        {
            distance = getDistance(x0, y0, x3, y3);
            xq_ = x3;
            yq_ = y3;
        }
        else
        {
             disA = getDistance(x0, y0, x1, y1);
             disB = getDistance(x0, y0, x2, y2);
            xq_ = (disA < disB ? x1 : x2);
            yq_ = (disA < disB ? y1 : y2);
            distance = Math.min(disA, disB);
        }
        if (distance < minDistance)
        {
            minDistance = distance;
            minIndex = i;
            xq = xq_;
            yq = yq_;
        }
    }
    PointF pointA = pointList[minIndex];
    PointF pointB = pointList[minIndex + 1];
     tA = 1.f / (pointList.length - 1) * minIndex;
     tB = 1.f / (pointList.length - 1) * (minIndex + 1);
     t = tA + (tB - tA) * getDistance(pointA.x, pointA.y, xq, yq) /
            getDistance(pointA.x, pointA.y, pointB.x, pointB.y);
    t = (t <= 0.f ? 0.0f : t);
    t = (t >= 1.f ? 1.0f : t);
    distanceAndT[0] = getDistance(x0, y0, xq, yq);
    distanceAndT[1] = t;
    return distanceAndT;
}

function getDivPointList( x0,  y0,  x1,  y1,  x2,  y2,  x3,     y3,  divs)
{
PointF[] pointList = new PointF[divs + 1];
for ( i = 0; i < divs; i++)
{
     t = 1.f / divs * i;
     x4 = divide(x0, x1, t);
     y4 = divide(y0, y1, t);
     x5 = divide(x1, x2, t);
     y5 = divide(y1, y2, t);
     x6 = divide(x2, x3, t);
     y6 = divide(y2, y3, t);
     x7 = divide(x4, x5, t);
     y7 = divide(y4, y5, t);
     x8 = divide(x5, x6, t);
     y8 = divide(y5, y6, t);
     x9 = divide(x7, x8, t);
     y9 = divide(y7, y8, t);
    pointList[i] = new PointF(x9, y9);
}
pointList[divs] = new PointF(x3, y3);
return pointList;
}

function getDistance( x0,  y0,  x1,  y1)
{
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}
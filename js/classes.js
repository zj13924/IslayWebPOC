export class RectF {
    left;
    top;
    right;
    bottom;
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    isEmpty() {
        return this.left >= this.right || this.top >= this.bottom;
    }
    width() {
        return this.right - this.left;
    }
    height() {
        return this.bottom - this.top;
    }
    centerX() {
        return (this.left + this.right) * 0.5;
    }
    centerY() {
        return (this.top + this.bottom) * 0.5;
    }
    set(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    setR(src) {
        this.left = src.left;
        this.top = src.top;
        this.right = src.right;
        this.bottom = src.bottom;
    }
    offset(dx, dy) {
        this.left += dx;
        this.top += dy;
        this.right += dx;
        this.bottom += dy;
    }
    offsetTo(newLeft, newTop) {
        this.right += newLeft - this.left;
        this.bottom += newTop - this.top;
        this.left = newLeft;
        this.top = newTop;
    }
    inset(dx, dy) {
        this.left += dx;
        this.top += dy;
        this.right -= dx;
        this.bottom -= dy;
    }
    containsP(x, y) {
        return this.left < this.right && this.top < this.bottom // check for empty first
            &&
            x >= this.left && x < this.right && y >= this.top && y < this.bottom;
    }
    contains(left, top, right, bottom) {
        // check for empty first
        return this.left < this.right && this.top < this.bottom
            // now check for containment
            &&
            this.left <= left && this.top <= top &&
            this.right >= right && this.bottom >= bottom;
    }
    containsR(r) {
        // check for empty first
        return this.left < this.right && this.top < this.bottom
            // now check for containment
            &&
            this.left <= r.left && this.top <= r.top &&
            this.right >= r.right && this.bottom >= r.bottom;
    }
    intersect(left, top, right, bottom) {
        if (this.left < right && left < this.right &&
            this.top < bottom && top < this.bottom) {
            if (this.left < left) {
                this.left = left;
            }
            if (this.top < top) {
                this.top = top;
            }
            if (this.right > right) {
                this.right = right;
            }
            if (this.bottom > bottom) {
                this.bottom = bottom;
            }
            return true;
        }
        return false;
    }
    intersectR(r) {
        return this.intersect(r.left, r.top, r.right, r.bottom);
    }
    setIntersect(a, b) {
        if (a.left < b.right && b.left < a.right &&
            a.top < b.bottom && b.top < a.bottom) {
            this.left = Math.max(a.left, b.left);
            this.top = Math.max(a.top, b.top);
            this.right = Math.min(a.right, b.right);
            this.bottom = Math.min(a.bottom, b.bottom);
            return true;
        }
        return false;
    }
    intersects(left, top, right, bottom) {
        return this.left < right && left < this.right &&
            this.top < bottom && top < this.bottom;
    }
    static sIntersects(a, b) {
        return a.left < b.right && b.left < a.right &&
            a.top < b.bottom && b.top < a.bottom;
    }
    round(dst) {
        dst.set(Math.round(this.left), Math.round(this.top),
            Math.round(this.right), Math.round(this.bottom));
    }
    roundOut(dst) {
        dst.set(Math.floor(this.left), Math.floor(this.top),
            Math.ceil(this.right), Math.ceil(this.bottom));
    }
    union(left, top, right, bottom) {
        if ((left < right) && (top < bottom)) {
            if ((this.left < this.right) && (this.top < this.bottom)) {
                if (this.left > left)
                    this.left = left;
                if (this.top > top)
                    this.top = top;
                if (this.right < right)
                    this.right = right;
                if (this.bottom < bottom)
                    this.bottom = bottom;
            } else {
                this.left = left;
                this.top = top;
                this.right = right;
                this.bottom = bottom;
            }
        }
    }
    unionR(r) {
        this.union(r.left, r.top, r.right, r.bottom);
    }
    unionP(x, y) {
        if (x < this.left) {
            this.left = x;
        } else if (x > this.right) {
            this.right = x;
        }
        if (y < this.top) {
            this.top = y;
        } else if (y > this.bottom) {
            this.bottom = y;
        }
    }
    sort() {
        if (this.left > this.right) {
            var temp = this.left;
            this.left = this.right;
            this.right = temp;
        }
        if (this.top > this.bottom) {
            var temp = this.top;
            this.top = this.bottom;
            this.bottom = temp;
        }
    }
    scale(scale) {
        if (scale != 1.0) {
            this.left = this.left * scale;
            this.top = this.top * scale;
            this.right = this.right * scale;
            this.bottom = this.bottom * scale;
        }
    }
}
export class PointF {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    setP(p) {
        this.x = p.x;
        this.y = p.y;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
    }
    offset(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    equals(x, y) {
        return this.x == x && this.y == y;
    }
    equalsP(p) {
        return this.x == p.x && this.y == p.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    static lengthP(x, y) {
        return Math.sqrt(x * x + y * y);
    }
}
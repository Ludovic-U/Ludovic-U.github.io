(function() {
    var container = document.getElementById("cv_card"),
        inner = document.getElementById("cv_card");

    var mouse = {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        updatePosition: function(event) {
            var e = event || window.event;
            this.x = e.clientX - this._x;
            this.y = (e.clientY - this._y) * -1;
        },
        setOrigin: function(e) {
            this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
            this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
        },
        show: function() {
            return "(" + this.x + ", " + this.y + ")";
        }
    };

    mouse.setOrigin(container);

    var counter = 0;
    var updateRate = 2;
    var isTimeToUpdate = function() {
        return counter++ % updateRate === 0;
    };


    var onMouseEnterHandler = function(event) {
        update(event);
    };

    var onMouseLeaveHandler = function() {
        inner.style = "";
    };

    var onMouseMoveHandler = function(event) {
        if (isTimeToUpdate()) {
            update(event);
        }
    };

    var update = function(event) {
        mouse.updatePosition(event);
        updateTransformStyle(
            (mouse.y / inner.offsetHeight / 2).toFixed(2),
            (mouse.x / inner.offsetWidth / 2).toFixed(2)
        );
    };

    var updateTransformStyle = function(x, y) {
        var style = "rotateX(" + x*20 + "deg) rotateY(" + y*20 + "deg)";
        inner.style.transform = style;
        inner.style.webkitTransform = style;
        inner.style.mozTransform = style;
        inner.style.msTransform = style;
        inner.style.oTransform = style;
    };

    document.body.onmouseenter = onMouseEnterHandler;
    document.body.onmouseleave = onMouseLeaveHandler;
    document.body.onmousemove = onMouseMoveHandler;
})();


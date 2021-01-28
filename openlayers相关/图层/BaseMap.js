//根据不同类型设置不同geometryFunction; 
var drawType = 'None', //绘制类型 
    geometryFunction = null;
//绘制图形方法函数 
if (value === 'Square') {
    //矩形 
    drawType = 'Circle';
    geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
} else if (value === 'Box') { //拉框矩形 
    drawType = 'Circle';
    geometryFunction = ol.interaction.Draw.createBox();
} else if (value === 'Star') { //星星，可自定义图形 
    drawType = 'Circle';
    geometryFunction = function (coordinates, geometry) {
        if (!geometry) { //根据绘制的坐标返回自定义的geometry，随意拓展 
            geometry = new ol.geom.Polygon(null);
        }
        var center = coordinates[0];
        var last = coordinates[1];
        var dx = center[0] - last[0];
        var dy = center[1] - last[1];
        var radius = Math.sqrt(dx * dx + dy * dy);
        var rotation = Math.atan2(dy, dx);
        var newCoordinates = [];
        var numPoints = 12;
        for (var i = 0; i < numPoints; ++i) {
            var angle = rotation + i * 2 * Math.PI / numPoints;
            var fraction = i % 2 === 0 ? 1 : 0.5;
            var offsetX = radius * fraction * Math.cos(angle);
            var offsetY = radius * fraction * Math.sin(angle);
            newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
        }
        newCoordinates.push(newCoordinates[0].slice());
        geometry.setCoordinates([newCoordinates]);
        return geometry;
    };
}
var draw = new ol.interaction.Draw({
    source: source,
    type: 'Point', //Point 点;LineString 线;Polygon 面;Circle 圆;None 空; 
    geometryFunction: geometryFunction
});
map.addInteraction(draw);
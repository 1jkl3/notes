// 图层一
var feature = new ol.Feature(
    new ol.geom.Point([120, 31])
)
// 图层二
var feature1 = new ol.Feature(
    new ol.geom.LineString([
        [120, 35],
        [120, 40]
    ])
)
// 图层一
var feature2 = new ol.Feature(
    new ol.geom.LineString([
        [121, 35],
        [121, 30]
    ])
)
// 图层一
var feature3 = new ol.Feature(
    new ol.geom.Point([120, 32])
)
// 图层二
var feature4 = new ol.Feature(
    new ol.geom.Point([121, 34])
)
// 图层二
var feature5 = new ol.Feature(
    new ol.geom.Point([121, 33])
)
// 图层一
var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [feature2, feature3, feature]
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "#fff"
        }),
        image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({
                color: "#3399CC"
            })
        }),
		text: new ol.style.Text({
			text:"哈哈"
		})
    }),
    opacity: 0.8
});
// 图层二
var vector1 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [feature1]
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "#fff"
        })
    }),
})
vector1.getSource().addFeatures([feature4, feature5])
feature5.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: "#224434"
        })
    })
}))
console.log(feature5.getStyle().getText());
feature4.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: "#1E1E1E"
        })
    })
}))

// if (!feature4.getStyle()) {
//     feature4.setStyle(new ol.style.Style({
//         image: new ol.style.Circle({
//             radius: 10,
//             fill: new ol.style.Fill({
//                 color: "#1E1E1E"
//             })
//         })
//     }))
// }else{
//     feature4.setStyle(null)
// }
var baseLayer = new ol.source.XYZ({
    url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB',
    maxZoom: 20,
})
// 底图
var gaodeMapLayer = new ol.layer.Tile({
    source: baseLayer
});
var gaodeMapLayer2 = new ol.layer.Tile({
    source: new ol.source.OSM()
});
// gaodeMapLayer.destroy()
// console.log(gaodeMapLayer);
// 地图
var map = new ol.Map({
    controls: new ol.control.defaults({
        zoom: false,
        rotate: false,
        attribution: false
    }),
    layers: [gaodeMapLayer2, vector, vector1],
    view: new ol.View({
        center: [120, 30],
        projection: 'EPSG:4326',
        zoom: 5
    }),
    target: 'map'
});
var over = new ol.Overlay({
    element: document.getElementById("test"),
    position: [120, 35]
})
// console.log(map.getLayers().clear());
// map.addOverlay(over)
// console.log(map.getLayers().getArray()[0].getSource());
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Text,
    Icon,
    Style
} from "ol/style"
import {
    LineString,
    Point,
    Circle,
    Polygon,
    MultiLineString,
    MultiPoint,
    MultiPolygon
} from 'ol/geom';
import {
    XYZ,
    OSM
} from 'ol/source';

// 数据源地址
export const dataSourceURL = {
    0: "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB"
}
// 公共数据源
export const dataSource = {
    "Baidu": new XYZ({
        url: dataSourceURL[0],
        maxZoom: 20
    }),
    "Gaode": new OSM({
        maxZoom: 20,
        wrapX: false
    }),
    "Google": ""
}
// 公共几何图形库
export const Geometrys = {
    "Point": (coord) => new Point(coord),
    "LineString": (coord) => new LineString(coord),
    "Polygon": (coord) => new Polygon(coord),
    "Circle": (coord, radius) => new Circle(coord, radius),
    "MultiPoint": (coord) => new MultiPoint(coord),
    "MultiLineString": (coord) => new MultiLineString(coord),
    "MultiPolygon": (coord) => new MultiPolygon(coord)
}
// View公共配置
export const defaultViewOptions = {
    center: [118.14161001864854, 27.362891709786183],
    projection: "EPSG:4326",
    zoom: 7,
    minZoom: 4,
    maxZoom: 14,
    extent: (() => {
        return [-180, -90, 180, 90]
    })()
}

/**
 * 公共图标集合
 * @description 内容未设置
 */
export const commonIcons = {
    "plane": require('@/assets/image/plane-b.png'),
    "car": require('@/assets/image/car.png'),
    "boat": require('@/assets/image/boat.png'),
    'unknown': require("@/assets/image/unknown-target.png")
}
// 公共样式表
export const defaultStyle = {
    "Icon": (src, text, rotation) => {
        return new Style({
            image: new Icon({
                anchor: [0.5, 0.5],
                src: commonIcons[src || 'unknown'],
                rotation
            }),
            text: text && new Text({
                text,
                offsetY: 18
            })
        })
    },
    "Point": (text) => {
        return new Style({
            stroke: new Stroke({
                color: "#fff"
            }),
            image: new CircleStyle({
                radius: 5,
                fill: new Fill({
                    color: "red"
                })
            }),
            text: text && new Text({
                text: text,
                offsetY: 18
            })
        })
    },
    "LineString": (text,lineDash) => {
        return new Style({
            stroke: new Stroke({
                color: "#000",
                width: 2,
                lineDash
            }),
            image: new CircleStyle({
                radius: 5,
                fill: new Fill({
                    color: "red"
                })
            }),
            text: text && new Text({
                text,
                offsetY: 18
            })
        })
    },
    "Polygon": (text,lineDash) => {
        return new Style({
            stroke: new Stroke({
                color: "#ff6688",
                width: 2,
                lineDash
            }),
            image: new CircleStyle({
                radius: 5,
                fill: new Fill({
                    color: "red"
                })
            }),
            fill: new Fill({
                color: "#ff6688"
            }),
            text: text && new Text({
                text,
                textAlign: "center",
            })
        })
    },
    "Circle": (text,lineDash) => {
        return new Style({
            stroke: new Stroke({
                color: "#000",
                lineDash
            }),
            fill: new Fill({
                color: "rgba(0,0,255,0.2)"
            }),
            text: text && new Text({
                text,
                offsetY: 18
            })
        })
    },
    "Sector": (text, lineDash,zIndex) => {
        return new Style({
            stroke: new Stroke({
                color: 'red',
                lineDash,
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.2)'
            }),
            text: text && new Text({
                text,
                offsetY: 18
            }),
            zIndex
        })
    }
}
// 动态修改样式表
export const ActiveStyle = {
    "": ""
}
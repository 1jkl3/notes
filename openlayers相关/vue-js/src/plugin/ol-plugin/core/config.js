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
/**
 * 公共图标集合
 * @description 内容未设置
 */
const commonIcons = {
    "icon1": "icon1",
    "icon2": "icon2",
    "icon3": "icon3",
    "Target": "Target",
    "icon4": "icon4",
}
// 公共样式表
export const defaultStyle = {
    "Icon": (src, text) => {
        return new Style({
            image: new Icon({
                anchor: [0.5, 0.5],
                src: commonIcons[src]
            }),
            text: text && new Text({
                text
            })
        })
    },
    "Point": (content) => {
        return new Style({
            stroke: new Stroke({
                color: "#fff"
            }),
            image: new CircleStyle({
                radius: 10,
                fill: new Fill({
                    color: "red"
                })
            }),
            text: content && new Text({
                text: content,
                offsetY: 18
            })
        })
    },
    "LineString": (text) => {
        return new Style({
            stroke: new Stroke({
                color: "#000",
                width: 2,
            }),
            image: new CircleStyle({
                radius: 10,
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
    "Polygon": (text) => {
        return new Style({
            stroke: new Stroke({
                color: "#ff6688",
                width: 2
            }),
            image: new CircleStyle({
                radius: 2,
                fill: new Fill({
                    color: "red"
                })
            }),
            fill: new Fill({
                color: "#ff6688"
            }),
            text: text && new Text({
                text,
                textAlign:"center",
            })
        })
    },
    "Circle": (text) => {
        return new Style({
            stroke: new Stroke({
                color: "#000"
            }),
            fill: new Fill({
                color: "#ff6688"
            }),
            image: new CircleStyle({
                radius: 10,
            }),
            text: text && new Text({
                text,
                offsetY: 18
            })
        })
    }
}
// 动态修改样式表
export const ActiveStyle = {
    "": ""
}
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
    "Point": new Point([]),
    "LineString": new LineString([]),
    "Polygon": new Polygon([]),
    "Circle": new Circle([]),
    "MultiPoint": new MultiPoint([]),
    "MultiLineString": new MultiLineString([]),
    "MultiPolygon": new MultiPolygon([])
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
// canvas文字换行问题
/**
 * 
 * @param {*} context canvas
 * @param {*} text 文字
 * @param {*} x x轴位置
 * @param {*} y y轴位置
 * @param {*} maxWidth 最大宽度
 * @param {*} lineHeight 文字高度
 * @param {*} row 行数
 */
function textEllipsis(context, text, x, y, maxWidth, lineHeight, row) {
  if (typeof text != "string" || typeof x != "number" || typeof y != "number") {
    return;
  }
  var canvas = context.canvas;

  if (typeof maxWidth == "undefined") {
    maxWidth = (canvas && canvas.width) || 300;
  }

  if (typeof lineHeight == "undefined") {
    // 有些情况取值结果是字符串，比如 normal。所以要判断一下
    var getLineHeight = window.getComputedStyle(canvas).lineHeight;
    var reg = /^[0-9]+.?[0-9]*$/;
    lineHeight = reg.test(getLineHeight) ? getLineHeight : 20;
  }

  // 字符分隔为数组
  var arrText = text.split("");
  // 文字最终占据的高度，放置在文字下面的内容排版，可能会根据这个来确定位置
  var textHeight = 0;
  // 每行显示的文字
  var showText = "";
  // 控制行数
  var limitRow = row;
  var rowCount = 0;

  for (var n = 0; n < arrText.length; n++) {
    var singleText = arrText[n];
    var connectShowText = showText + singleText;
    // 没有传控制的行数，那就一直换行
    var isLimitRow = limitRow ? rowCount === limitRow - 1 : false;
    var measureText = isLimitRow ? connectShowText + "…" : connectShowText;
    var metrics = context.measureText(measureText);
    var textWidth = metrics.width;

    if (textWidth > maxWidth && n > 0 && rowCount !== limitRow) {
      var canvasShowText = isLimitRow ? measureText : showText;
      context.fillText(canvasShowText, x, y);
      showText = singleText;
      y += lineHeight;
      textHeight += lineHeight;
      rowCount++;
      if (isLimitRow) {
        break;
      }
    } else {
      showText = connectShowText;
    }
  }
  if (rowCount !== limitRow) {
    context.fillText(showText, x, y);
  }

  var textHeightValue =
    rowCount < limitRow ? textHeight + lineHeight : textHeight;
  return textHeightValue;
}
export default textEllipsis;
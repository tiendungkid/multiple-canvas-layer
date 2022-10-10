const [canvasWidth, canvasHeight] = [900, 600]
const overlayColor = 'rgba(0,0,0,0.05)';
const stage = new Konva.Stage({
    container: 'rivers',
    width: canvasWidth,
    height: canvasHeight
})
const imageLayer = new Konva.Layer()
const shapesLayer = new Konva.Layer()
const tooltipLayer = new Konva.Layer()

stage.add(imageLayer, shapesLayer, tooltipLayer)

const riverImage = new Image()
riverImage.src = 'src/rivers.webp'
riverImage.onload = () => {
    imageLayer.add(new Konva.Image({
        x: 0,
        y: 0,
        image: riverImage,
        width: canvasWidth,
        height: canvasHeight,
        draggable: false,
        opacity: 1
    }))
}

shapesLayer.add(
    new Konva.Line({
        points: [255.5, 192, 478.5, 223, 462.5, 341, 436.5, 521, 364.5, 516, 340.5, 511, 173.5, 426, 170.5, 414, 175.5, 408, 182.5, 402, 189.5, 400, 184.5, 397, 184.5, 377, 184.5, 370, 192.5, 364, 199.5, 346, 215.5, 335, 215.5, 332, 208.5, 326, 208.5, 318, 204.5, 310, 203.5, 298, 206.5, 288, 209.5, 282, 213.5, 257, 212.5, 239, 216.5, 233, 222.5, 233, 231.5, 233, 237.5, 242, 247.5, 233, 254.5, 195, 254.5, 193],
        closed: true,
        fill: overlayColor,
        key: 'first-land',
        name: 'Mekong River'
    }),
    new Konva.Line({
        points: [267.5, 104, 423.5, 106, 433.5, 119, 553.5, 122, 589.5, 124, 593.5, 129, 595.5, 135, 600.5, 136, 606.5, 131, 604.5, 124, 607.5, 116, 612.5, 112, 618.5, 112, 621.5, 115, 641.5, 118, 647.5, 143, 655.5, 168, 665.5, 190, 669.5, 198, 683.5, 200, 690.5, 211, 687.5, 219, 696.5, 235, 695.5, 255, 728.5, 319, 730.5, 333, 737.5, 334, 747.5, 348, 739.5, 364, 728.5, 365, 729.5, 375, 726.5, 386, 713.5, 402, 712.5, 424, 703.5, 434, 692.5, 437, 674.5, 434, 669.5, 422, 660.5, 417, 655.5, 408, 644.5, 398, 624.5, 386, 614.5, 379, 609.5, 361, 602.5, 353, 601.5, 343, 587.5, 336, 563.5, 306, 559.5, 296, 553.5, 275, 555.5, 271, 556.5, 255, 564.5, 243, 563.5, 226, 554.5, 213, 541.5, 211, 528.5, 197, 519.5, 187, 505.5, 178, 488.5, 167, 475.5, 164, 468.5, 165, 465.5, 171, 455.5, 177, 428.5, 184, 405.5, 188, 396.5, 175, 392.5, 167, 378.5, 157, 367.5, 159, 357.5, 155, 340.5, 153, 339.5, 150, 330.5, 153, 317.5, 153, 306.5, 151, 281.5, 155, 274.5, 150, 274.5, 142, 269.5, 135, 270.5, 126, 263.5, 117],
        closed: true,
        fill: overlayColor,
        key: 'second-land',
        name: 'Red River'
    })
)
const tooltip = new Konva.Label({
    opacity: 0.75,
    visible: false,
    listening: false,
})

tooltip.add(
    new Konva.Tag({
        fill: 'black',
        pointerDirection: 'down',
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.5,
    })
)
tooltip.add(
    new Konva.Text({
        text: '',
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white',
    })
)
tooltipLayer.add(tooltip)

function updateTooltip(tooltip, x, y, text) {
    tooltip.getText().text(text)
    tooltip.position({
        x: x,
        y: y,
    });
    tooltip.show()
}

stage.on('mouseover', function (evt) {
    const shape = evt.target
    if (shape && shape.attrs.key?.endsWith('-land')) {
        shape.fill('transparent')
    }
})

stage.on('mouseout', function (evt) {
    const shape = evt.target
    if (shape && shape.attrs.key?.endsWith('-land')) {
        shape.fill(overlayColor)
        tooltip.hide()
    }
})
stage.on('mousemove', function (evt) {
    const shape = evt.target
    if (shape && shape.attrs.key?.endsWith('-land')) {
        const mousePos = stage.getPointerPosition();
        const x = mousePos.x;
        const y = mousePos.y - 5;
        updateTooltip(tooltip, x, y, shape.attrs.name);
    }
});

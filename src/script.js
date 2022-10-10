const [canvasWidth, canvasHeight] = [900, 600]
const stage = new Konva.Stage({
    container: 'rivers',
    width: canvasWidth,
    height: canvasHeight
})


const imageLayer = new Konva.Layer()
const tooltipLayer = new Konva.Layer()
stage.add(imageLayer, tooltipLayer)
const tooltip = buildTooltip()
tooltipLayer.add(tooltip)
addStageMouseMoveListener()

function loadImages() {
    const imageWidth = 400
    const redRiverImage = new Image(imageWidth, imageWidth)
    const mekongRiverImage = new Image(imageWidth, imageWidth)
    redRiverImage.src = './src/red.png'
    mekongRiverImage.src = './src/mekong.png'

    redRiverImage.onload = () => buildStage('red', redRiverImage)
    mekongRiverImage.onload = () => buildStage('mekong', mekongRiverImage)

}

function buildStage(riverName, image) {
    const positions = {
        red: {
            x: 300,
            y: 0
        },
        mekong: {
            x: 115,
            y: 130
        }
    }
    const riverPosition = positions[riverName]
    const river = new Konva.Image({
        image: image,
        ...riverPosition,
        opacity: 0.9,
        key: riverName + '-river',
        riverName: riverName,
        draggable: true,
        dragBoundFunc: function (data) {
            console.log(data)
        }
    })
    river.on('mouseover', function (evt) {
        evt.target.opacity(1)
    })

    river.on('mouseout', function (evt) {
        evt.target.opacity(0.9)
        tooltip.hide()
    })

    river.on('dblclick', function (evt) {
        alert(`Open ${riverName} river action`)
        console.log(evt.target)
    })

    river.on('mouseenter', function () {
        stage.container().style.cursor = 'pointer'
    })

    river.on('mouseleave', function () {
        stage.container().style.cursor = 'default'
    })

    river.cache()
    river.drawHitFromCache()
    imageLayer.add(river)
}

function buildTooltip() {
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
    return tooltip
}

function addStageMouseMoveListener() {
    stage.on('mousemove', function (evt) {
        const image = evt.target
        if (image && image.attrs.key?.endsWith('-river')) {
            const mousePos = stage.getPointerPosition()
            const x = mousePos.x
            const y = mousePos.y - 5
            updateTooltip(tooltip, x, y, image.attrs.riverName)
        }
    })
}

function updateTooltip(tooltip, x, y, text) {
    tooltip.getText().text(text)
    tooltip.position({
        x: x,
        y: y,
    })
    tooltip.show()
}

loadImages()
const shapeCoordinates = []

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    shapeCoordinates.push(x, y)
    console.log(shapeCoordinates)
}

setTimeout(() => {
    const canvas = document.querySelector('canvas:first-child')
    canvas.addEventListener('click', function (e) {
        getCursorPosition(canvas, e)
    })
}, 1e3)
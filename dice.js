var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")

var diceSize = 60
var spacing = 20
var switchTrack = "manual"
var frequency = [0,0,0,0,0,0,0,0,0,0,0]

function drawDie(x, y, value) {
  ctx.clearRect(x, y, diceSize, diceSize)
  ctx.beginPath()
  ctx.rect(x, y, diceSize, diceSize)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.stroke()
  
  ctx.fillStyle = '#000000'
  var dotSize = 10
  var dotSpacing = (diceSize - 2 * dotSize) / 3
  
  if (value === 1 || value === 3 || value === 5) {
    ctx.beginPath()
    ctx.arc(x + diceSize / 2, y + diceSize / 2, dotSize / 2, 0, Math.PI * 2)
    ctx.fill()
  }
  
  if (value === 2 || value === 3 || value === 4 || value === 5 || value === 6) {
    ctx.beginPath()
    ctx.arc(x + dotSpacing, y + dotSpacing, dotSize / 2, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(x + diceSize - dotSpacing, y + diceSize - dotSpacing, dotSize / 2, 0, Math.PI * 2)
    ctx.fill()
  }
  
  if (value === 4 || value === 5 || value === 6) {
    ctx.beginPath()
    ctx.arc(x + dotSpacing, y + diceSize - dotSpacing, dotSize / 2, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(x + diceSize - dotSpacing, y + dotSpacing, dotSize / 2, 0, Math.PI * 2)
    ctx.fill()
  }
  
  if (value === 6) {
    ctx.beginPath()
    ctx.arc(x + dotSpacing, y + diceSize / 2, dotSize / 2, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(x + diceSize - dotSpacing, y + diceSize / 2, dotSize / 2, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawTrackStatus(){
  ctx.clearRect(canvas.width-200,50,canvas.width,100)
  if(switchTrack=="auto"){
    ctx.font = "40px Arial"
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.fillText("Auto", canvas.width-100, 100)
  }else{
    ctx.font = "40px Arial"
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.fillText("Manual", canvas.width-100, 100)
  }
}

function drawArray() {
  var barMargin = 10
  var maxWidth = canvas.width - 100 // Adjust margin
  var maxHeight = canvas.height - 200 // Adjust margin
  var maxFrequency = Math.max(...frequency)
  var scalingFactor = Math.min(maxHeight / maxFrequency, maxWidth / frequency.length)
  var barWidth = (maxWidth - (frequency.length - 1) * barMargin) / frequency.length
  var totalWidth = frequency.length * (barWidth + barMargin) - barMargin
  var startX = (canvas.width - totalWidth) / 2
  var threshold = maxFrequency * 0.5 // Adjust threshold as needed
  
  for (var i = 0 ;i < frequency.length; i++) {
    var barHeight = frequency[i] * scalingFactor
    var x = startX + (barWidth + barMargin) * i
    var y = canvas.height - barHeight - 100
    
    // Calculate hue value based on the bar's height
    var hue = (barHeight / maxHeight) * 120 // 0 (blue) to 120 (red)
    
    // Convert hue to HSL color format
    var color = 'hsl(' + hue + ', 100%, 50%)'
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth, barHeight)
    
    ctx.fillStyle = '#000000'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(frequency[i], x + barWidth / 2, y - 10)
  }
  ctx.fillText(frequency, canvas.width/2,canvas.height-canvas.height/8)
}

function auto() {
  if (switchTrack == "auto") {
    requestAnimationFrame(auto)
    clearCanvas()
    rollAndDrawDice()
    drawTrackStatus()
    drawArray()
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}


function calculateSum(v1,v2){
  frequency[v1+v2-2]++
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}

function rollAndDrawDice() {
  var value1 = rollDie()
  var value2 = rollDie()
  
  drawDie(spacing, spacing, value1)
  drawDie(2 * spacing + diceSize, spacing, value2)
  calculateSum(value1,value2)
}

addEventListener("click", function(event){
  if(switchTrack=="manual"){
    clearCanvas()
    rollAndDrawDice()
  }
  drawTrackStatus()
  drawArray()
})

addEventListener("keydown", function(event){
  if(event.key=="e"){
    if(switchTrack=="manual"){
      switchTrack="auto"
      auto()
    }else {
      switchTrack="manual"
    }
  }
  drawTrackStatus()
})
rollAndDrawDice()
drawTrackStatus()
drawArray()

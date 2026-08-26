const fs = require('fs')
const { drawFullLight, drawLiteLight, mkBlob } = require('./app/components/ambient-bg.tsx')
const canvas = require('canvas')
const W = 390, H = 844
let blobs = []
let motes = []
let t = 0

// Test light mode draw
function testLite() {
  blobs = []
  motes = []
  const pal = ['#4f46e5', '#7c3aed', '#f59e0b', '#818cf8', '#c084fc']
  for (let i = 0; i < 3; i++) {
    blobs.push(mkBlob(W, H, pal))
  }
  drawLiteLight(ctx, motes, blobs, W, H, 0, 0)
  // count non-white pixels
  const img = fs.readFileSync('c.jpg')
  const data = fs.readFileSync('c.jpg')
  let nonWhite = 0
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2]
    if (r > 220 || g > 220 || b > 220) nonWhite++  // not pure white
  }
  console.log('light non-white pixels:', nonWhite)
}

// Test ocean ripple draw
function testOcean() {
  blobs = []
  motes = []
  const pal = ['#38bdf8', '#0ea5e9', '#818cf8', '#06b6d4', '#22d3ee']
  drawFullOcean(ctx, [], pal, 0, 0, W, H, { v: 0 })
  // count non-white pixels
  const img = fs.readFileSync('o.jpg')
  const data = fs.readFileSync('o.jpg')
  let nonWhite = 0
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2]
    if (r < 200 || g < 200 || b < 200) nonWhite++  // not white
  }
  console.log('ocean non-white pixels:', nonWhite)
}

const { createCanvas } = require('canvas')
const canvas = createCanvas(W, H)
const ctx = canvas.getContext('2d')

// Run tests
testLite()
testOcean()
console.log('Done')
class RubiksCube {
  constructor() {
    this.faces = {
      top: Array(9).fill(0), // White
      bottom: Array(9).fill(1), // Yellow
      front: Array(9).fill(2), // Red
      back: Array(9).fill(3), // Orange
      right: Array(9).fill(4), // Blue
      left: Array(9).fill(5), // Green
    }

    this.colors = ["white", "yellow", "red", "orange", "blue", "green"]
    this.moveHistory = []
  }

  // Clone the cube state
  clone() {
    const newCube = new RubiksCube()
    for (const face in this.faces) {
      newCube.faces[face] = [...this.faces[face]]
    }
    newCube.moveHistory = [...this.moveHistory]
    return newCube
  }

  // Rotate a face 90 degrees clockwise
  rotateFace(face) {
    const temp = [...this.faces[face]]
    this.faces[face][0] = temp[6]
    this.faces[face][1] = temp[3]
    this.faces[face][2] = temp[0]
    this.faces[face][3] = temp[7]
    this.faces[face][4] = temp[4]
    this.faces[face][5] = temp[1]
    this.faces[face][6] = temp[8]
    this.faces[face][7] = temp[5]
    this.faces[face][8] = temp[2]
  }

  // All cube rotations
  rotateR() {
    this.rotateFace("right")
    const temp = [this.faces.top[2], this.faces.top[5], this.faces.top[8]]
    this.faces.top[2] = this.faces.front[2]
    this.faces.top[5] = this.faces.front[5]
    this.faces.top[8] = this.faces.front[8]
    this.faces.front[2] = this.faces.bottom[2]
    this.faces.front[5] = this.faces.bottom[5]
    this.faces.front[8] = this.faces.bottom[8]
    this.faces.bottom[2] = this.faces.back[6]
    this.faces.bottom[5] = this.faces.back[3]
    this.faces.bottom[8] = this.faces.back[0]
    this.faces.back[6] = temp[0]
    this.faces.back[3] = temp[1]
    this.faces.back[0] = temp[2]
  }

  rotateRPrime() {
    this.rotateR()
    this.rotateR()
    this.rotateR()
  }

  rotateL() {
    this.rotateFace("left")
    const temp = [this.faces.top[0], this.faces.top[3], this.faces.top[6]]
    this.faces.top[0] = this.faces.back[8]
    this.faces.top[3] = this.faces.back[5]
    this.faces.top[6] = this.faces.back[2]
    this.faces.back[8] = this.faces.bottom[0]
    this.faces.back[5] = this.faces.bottom[3]
    this.faces.back[2] = this.faces.bottom[6]
    this.faces.bottom[0] = this.faces.front[0]
    this.faces.bottom[3] = this.faces.front[3]
    this.faces.bottom[6] = this.faces.front[6]
    this.faces.front[0] = temp[0]
    this.faces.front[3] = temp[1]
    this.faces.front[6] = temp[2]
  }

  rotateLPrime() {
    this.rotateL()
    this.rotateL()
    this.rotateL()
  }

  rotateU() {
    this.rotateFace("top")
    const temp = [this.faces.front[0], this.faces.front[1], this.faces.front[2]]
    this.faces.front[0] = this.faces.right[0]
    this.faces.front[1] = this.faces.right[1]
    this.faces.front[2] = this.faces.right[2]
    this.faces.right[0] = this.faces.back[0]
    this.faces.right[1] = this.faces.back[1]
    this.faces.right[2] = this.faces.back[2]
    this.faces.back[0] = this.faces.left[0]
    this.faces.back[1] = this.faces.left[1]
    this.faces.back[2] = this.faces.left[2]
    this.faces.left[0] = temp[0]
    this.faces.left[1] = temp[1]
    this.faces.left[2] = temp[2]
  }

  rotateUPrime() {
    this.rotateU()
    this.rotateU()
    this.rotateU()
  }

  rotateD() {
    this.rotateFace("bottom")
    const temp = [this.faces.front[6], this.faces.front[7], this.faces.front[8]]
    this.faces.front[6] = this.faces.left[6]
    this.faces.front[7] = this.faces.left[7]
    this.faces.front[8] = this.faces.left[8]
    this.faces.left[6] = this.faces.back[6]
    this.faces.left[7] = this.faces.back[7]
    this.faces.left[8] = this.faces.back[8]
    this.faces.back[6] = this.faces.right[6]
    this.faces.back[7] = this.faces.right[7]
    this.faces.back[8] = this.faces.right[8]
    this.faces.right[6] = temp[0]
    this.faces.right[7] = temp[1]
    this.faces.right[8] = temp[2]
  }

  rotateDPrime() {
    this.rotateD()
    this.rotateD()
    this.rotateD()
  }

  rotateF() {
    this.rotateFace("front")
    const temp = [this.faces.top[6], this.faces.top[7], this.faces.top[8]]
    this.faces.top[6] = this.faces.left[8]
    this.faces.top[7] = this.faces.left[5]
    this.faces.top[8] = this.faces.left[2]
    this.faces.left[8] = this.faces.bottom[2]
    this.faces.left[5] = this.faces.bottom[1]
    this.faces.left[2] = this.faces.bottom[0]
    this.faces.bottom[2] = this.faces.right[0]
    this.faces.bottom[1] = this.faces.right[3]
    this.faces.bottom[0] = this.faces.right[6]
    this.faces.right[0] = temp[0]
    this.faces.right[3] = temp[1]
    this.faces.right[6] = temp[2]
  }

  rotateFPrime() {
    this.rotateF()
    this.rotateF()
    this.rotateF()
  }

  rotateB() {
    this.rotateFace("back")
    const temp = [this.faces.top[0], this.faces.top[1], this.faces.top[2]]
    this.faces.top[0] = this.faces.right[2]
    this.faces.top[1] = this.faces.right[5]
    this.faces.top[2] = this.faces.right[8]
    this.faces.right[2] = this.faces.bottom[8]
    this.faces.right[5] = this.faces.bottom[7]
    this.faces.right[8] = this.faces.bottom[6]
    this.faces.bottom[8] = this.faces.left[6]
    this.faces.bottom[7] = this.faces.left[3]
    this.faces.bottom[6] = this.faces.left[0]
    this.faces.left[6] = temp[0]
    this.faces.left[3] = temp[1]
    this.faces.left[0] = temp[2]
  }

  rotateBPrime() {
    this.rotateB()
    this.rotateB()
    this.rotateB()
  }

  // Execute a move by string
  executeMove(move) {
    switch (move) {
      case "R":
        this.rotateR()
        break
      case "R'":
        this.rotateRPrime()
        break
      case "L":
        this.rotateL()
        break
      case "L'":
        this.rotateLPrime()
        break
      case "U":
        this.rotateU()
        break
      case "U'":
        this.rotateUPrime()
        break
      case "D":
        this.rotateD()
        break
      case "D'":
        this.rotateDPrime()
        break
      case "F":
        this.rotateF()
        break
      case "F'":
        this.rotateFPrime()
        break
      case "B":
        this.rotateB()
        break
      case "B'":
        this.rotateBPrime()
        break
    }
    this.moveHistory.push(move)
  }

  // Execute multiple moves
  executeMoves(moves) {
    for (const move of moves) {
      this.executeMove(move)
    }
  }

  // Check if cube is solved
  isSolved() {
    for (const face in this.faces) {
      const faceColors = this.faces[face]
      const firstColor = faceColors[0]
      if (!faceColors.every((color) => color === firstColor)) {
        return false
      }
    }
    return true
  }

  // Generate and execute scramble moves
  generateAndExecuteScramble() {
    const solutionLength = 15 + Math.floor(Math.random() * 6) // 15-20 moves
    const possibleMoves = ["R", "R'", "L", "L'", "U", "U'", "D", "D'", "F", "F'", "B", "B'"]
    const scrambleMoves = []

    for (let i = 0; i < solutionLength; i++) {
      let move
      do {
        move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
      } while (scrambleMoves.length > 0 && this.isOppositeMove(move, scrambleMoves[scrambleMoves.length - 1]))

      scrambleMoves.push(move)
      this.executeMove(move)
    }

    // Generate solution (reverse of scramble)
    const solution = this.reverseMoves(scrambleMoves)

    return { scrambleMoves, solution }
  }

  // Check if two moves are opposites
  isOppositeMove(move1, move2) {
    const opposites = {
      R: "R'",
      "R'": "R",
      L: "L'",
      "L'": "L",
      U: "U'",
      "U'": "U",
      D: "D'",
      "D'": "D",
      F: "F'",
      "F'": "F",
      B: "B'",
      "B'": "B",
    }
    return opposites[move1] === move2
  }

  // Reverse a sequence of moves
  reverseMoves(moves) {
    const reversed = []
    for (let i = moves.length - 1; i >= 0; i--) {
      const move = moves[i]
      if (move.includes("'")) {
        reversed.push(move.replace("'", ""))
      } else {
        reversed.push(move + "'")
      }
    }
    return reversed
  }

  // Reset to solved state
  reset() {
    this.faces = {
      top: Array(9).fill(0),
      bottom: Array(9).fill(1),
      front: Array(9).fill(2),
      back: Array(9).fill(3),
      right: Array(9).fill(4),
      left: Array(9).fill(5),
    }
    this.moveHistory = []
  }
}

// UI Controller
class CubeUI {
  constructor() {
    this.cube = new RubiksCube()
    this.solution = []
    this.currentMoveIndex = 0
    this.isAnimating = false
    this.scrambleCount = 0
    this.maxScrambles = 5
    this.generatedScrambles = []
    this.initializeElements()
    this.bindEvents()
    this.render()
  }

  initializeElements() {
    this.cubeDisplay = document.getElementById("cubeDisplay")
    this.scrambleBtn = document.getElementById("scrambleBtn")
    this.solveBtn = document.getElementById("solveBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.resetBtn = document.getElementById("resetBtn")
    this.scrambleCountSpan = document.getElementById("scrambleCount")
    this.currentStep = document.getElementById("currentStep")
    this.scrambleDisplay = document.getElementById("scrambleDisplay")
    this.currentMoveDisplay = document.getElementById("currentMoveDisplay")
  }

  bindEvents() {
    this.scrambleBtn.addEventListener("click", () => this.generateScramble())
    this.solveBtn.addEventListener("click", () => this.generateSolution())
    this.nextBtn.addEventListener("click", () => this.executeNextMove())
    this.resetBtn.addEventListener("click", () => this.reset())
  }

  render() {
    this.cubeDisplay.innerHTML = ""

    // Create cube layout (unfolded)
    const layout = [
      ["empty", "empty", "empty", "top", "top", "top", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "top", "top", "top", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "top", "top", "top", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["left", "left", "left", "front", "front", "front", "right", "right", "right", "back", "back", "back"],
      ["left", "left", "left", "front", "front", "front", "right", "right", "right", "back", "back", "back"],
      ["left", "left", "left", "front", "front", "front", "right", "right", "right", "back", "back", "back"],
      ["empty", "empty", "empty", "bottom", "bottom", "bottom", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "bottom", "bottom", "bottom", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "bottom", "bottom", "bottom", "empty", "empty", "empty", "empty", "empty", "empty"],
    ]

    const faceCounters = {
      top: 0,
      left: 0,
      front: 0,
      right: 0,
      back: 0,
      bottom: 0,
    }

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 12; col++) {
        const cell = document.createElement("div")
        const faceType = layout[row][col]

        if (faceType === "empty") {
          cell.className = "face empty"
        } else {
          const colorIndex = this.cube.faces[faceType][faceCounters[faceType]]
          cell.className = `face ${this.cube.colors[colorIndex]}`
          faceCounters[faceType]++
        }

        this.cubeDisplay.appendChild(cell)
      }
    }

    // Update scramble count
    this.scrambleCountSpan.textContent = this.scrambleCount
  }

  generateScramble() {
    if (this.isAnimating || this.scrambleCount >= this.maxScrambles) return

    this.isAnimating = true
    this.scrambleCount++

    this.currentStep.textContent = "Generating and executing scramble..."

    // Generate and execute scramble, get solution
    const { scrambleMoves, solution } = this.cube.generateAndExecuteScramble()
    this.solution = solution
    this.currentMoveIndex = 0
    this.generatedScrambles.push(scrambleMoves)

    // Update UI
    this.scrambleDisplay.innerHTML = `
      <div class="scramble-info">
        Scramble ${this.scrambleCount} Applied (${scrambleMoves.length} moves)
        <div class="scramble-moves">${scrambleMoves.join(" ")}</div>
      </div>
    `

    this.render()

    setTimeout(() => {
      this.currentStep.textContent = `Scramble ${this.scrambleCount} applied! Cube is now scrambled. Click 'Generate Solution' to solve.`
      this.solveBtn.disabled = false

      // Update scramble button
      if (this.scrambleCount >= this.maxScrambles) {
        this.scrambleBtn.disabled = true
        this.scrambleBtn.textContent = "Max Scrambles Reached (5/5)"
      }

      this.isAnimating = false
    }, 500)
  }

  generateSolution() {
    if (this.isAnimating) return
    if (this.cube.isSolved()) {
      this.currentStep.textContent = "Cube is already solved!"
      return
    }

    this.currentStep.textContent = `Solution ready! ${this.solution.length} moves to solve. Click 'Next Move' to start.`
    this.nextBtn.disabled = false

    this.currentMoveDisplay.innerHTML = `
      <div class="move-info">
        Solution generated: ${this.solution.length} moves
        <br>
        <small>Click 'Next Move' to execute step by step</small>
      </div>
    `

    this.render()
  }

  async executeNextMove() {
    if (this.isAnimating || this.currentMoveIndex >= this.solution.length) return

    this.isAnimating = true

    const move = this.solution[this.currentMoveIndex]
    this.cube.executeMove(move)
    this.currentMoveIndex++

    // Update display
    this.currentMoveDisplay.innerHTML = `
      <div class="move-info">
        Move ${this.currentMoveIndex}: ${move}
      </div>
    `

    this.render()

    // Check if solved
    if (this.currentMoveIndex >= this.solution.length) {
      setTimeout(() => {
        if (this.cube.isSolved()) {
          this.currentStep.textContent = "🎉 Cube solved successfully!"
          this.currentMoveDisplay.innerHTML = `
            <div class="solved-message">
              ✅ Solved in ${this.solution.length} moves!
            </div>
          `
        } else {
          this.currentStep.textContent = "Solution completed, but cube not fully solved."
        }
        this.nextBtn.disabled = true
        this.isAnimating = false
      }, 300)
    } else {
      this.currentStep.textContent = `Move ${this.currentMoveIndex} of ${this.solution.length} completed. Click 'Next Move' to continue.`
      setTimeout(() => {
        this.isAnimating = false
      }, 300)
    }
  }

  reset() {
    if (this.isAnimating) return

    this.cube.reset()
    this.solution = []
    this.currentMoveIndex = 0
    this.scrambleCount = 0
    this.generatedScrambles = []

    // Reset UI
    this.render()
    this.currentStep.textContent = "Reset to solved state"
    this.scrambleDisplay.innerHTML = ""
    this.currentMoveDisplay.innerHTML = ""

    // Reset buttons
    this.scrambleBtn.disabled = false
    this.scrambleBtn.textContent = "Generate Scramble (0/5)"
    this.solveBtn.disabled = true
    this.nextBtn.disabled = true
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new CubeUI()
})

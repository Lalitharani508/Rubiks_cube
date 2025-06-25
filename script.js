// Simple Rubik's Cube Class
class RubiksCube {
  constructor() {
    this.faces = {
      top: [0, 0, 0, 0, 0, 0, 0, 0, 0], // white
      bottom: [1, 1, 1, 1, 1, 1, 1, 1, 1], // yellow
      front: [2, 2, 2, 2, 2, 2, 2, 2, 2], // red
      back: [3, 3, 3, 3, 3, 3, 3, 3, 3], // orange
      right: [4, 4, 4, 4, 4, 4, 4, 4, 4], // blue
      left: [5, 5, 5, 5, 5, 5, 5, 5, 5], // green
    }
    this.colors = ["white", "yellow", "red", "orange", "blue", "green"]
  }

  // Save current state
  saveState() {
    return {
      top: [...this.faces.top],
      bottom: [...this.faces.bottom],
      front: [...this.faces.front],
      back: [...this.faces.back],
      right: [...this.faces.right],
      left: [...this.faces.left],
    }
  }

  // Restore state
  restoreState(state) {
    this.faces.top = [...state.top]
    this.faces.bottom = [...state.bottom]
    this.faces.front = [...state.front]
    this.faces.back = [...state.back]
    this.faces.right = [...state.right]
    this.faces.left = [...state.left]
  }

  // Rotate face clockwise
  rotateFace(face) {
    const f = this.faces[face]
    const temp = [...f]
    f[0] = temp[6]
    f[1] = temp[3]
    f[2] = temp[0]
    f[3] = temp[7]
    f[4] = temp[4]
    f[5] = temp[1]
    f[6] = temp[8]
    f[7] = temp[5]
    f[8] = temp[2]
  }

  // Basic moves
  R() {
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

  L() {
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

  U() {
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

  D() {
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

  F() {
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

  B() {
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

  // Execute move by string
  executeMove(move) {
    switch (move) {
      case "R":
        this.R()
        break
      case "R'":
        this.R()
        this.R()
        this.R()
        break
      case "L":
        this.L()
        break
      case "L'":
        this.L()
        this.L()
        this.L()
        break
      case "U":
        this.U()
        break
      case "U'":
        this.U()
        this.U()
        this.U()
        break
      case "D":
        this.D()
        break
      case "D'":
        this.D()
        this.D()
        this.D()
        break
      case "F":
        this.F()
        break
      case "F'":
        this.F()
        this.F()
        this.F()
        break
      case "B":
        this.B()
        break
      case "B'":
        this.B()
        this.B()
        this.B()
        break
    }
  }

  // Generate scramble
  generateScramble() {
    const moves = ["R", "R'", "L", "L'", "U", "U'", "D", "D'", "F", "F'", "B", "B'"]
    const scramble = []
    for (let i = 0; i < 15 + Math.floor(Math.random() * 6); i++) {
      let move
      do {
        move = moves[Math.floor(Math.random() * moves.length)]
      } while (scramble.length > 0 && this.isOpposite(move, scramble[scramble.length - 1]))
      scramble.push(move)
      this.executeMove(move)
    }
    return scramble
  }

  // Check if moves are opposite
  isOpposite(move1, move2) {
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

  // Get reverse moves for solution
  getSolution(scramble) {
    const solution = []
    for (let i = scramble.length - 1; i >= 0; i--) {
      const move = scramble[i]
      if (move.includes("'")) {
        solution.push(move.replace("'", ""))
      } else {
        solution.push(move + "'")
      }
    }
    return solution
  }

  // Reset cube
  reset() {
    this.faces = {
      top: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      bottom: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      front: [2, 2, 2, 2, 2, 2, 2, 2, 2],
      back: [3, 3, 3, 3, 3, 3, 3, 3, 3],
      right: [4, 4, 4, 4, 4, 4, 4, 4, 4],
      left: [5, 5, 5, 5, 5, 5, 5, 5, 5],
    }
  }
}

// UI Controller
class CubeUI {
  constructor() {
    this.cube = new RubiksCube()
    this.scrambles = []
    this.solutions = []
    this.scrambleStates = []
    this.solutionStates = []
    this.solvedScrambles = new Set()
    this.currentScrambleIndex = -1
    this.currentMoveIndex = -1

    this.initElements()
    this.bindEvents()
    this.render()
  }

  initElements() {
    this.cubeElement = document.getElementById("cube")
    this.generateBtn = document.getElementById("generateBtn")
    this.resetBtn = document.getElementById("resetBtn")
    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.status = document.getElementById("status")
    this.moveInfo = document.getElementById("moveInfo")
    this.scrambleSelector = document.getElementById("scrambleSelector")
    this.scrambleButtons = document.getElementById("scrambleButtons")
  }

  bindEvents() {
    this.generateBtn.addEventListener("click", () => this.generateAllScrambles())
    this.resetBtn.addEventListener("click", () => this.reset())
    this.prevBtn.addEventListener("click", () => this.previousMove())
    this.nextBtn.addEventListener("click", () => this.nextMove())
  }

  render() {
    this.cubeElement.innerHTML = ""

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

    const faceCounters = { top: 0, left: 0, front: 0, right: 0, back: 0, bottom: 0 }

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

        this.cubeElement.appendChild(cell)
      }
    }
  }

  generateAllScrambles() {
    this.scrambles = []
    this.solutions = []
    this.scrambleStates = []
    this.solutionStates = []
    this.solvedScrambles.clear()
    this.currentScrambleIndex = -1
    this.currentMoveIndex = -1

    // Generate 5 scrambles
    for (let i = 0; i < 5; i++) {
      // Reset cube to solved state
      this.cube.reset()

      // Generate scramble
      const scrambleMoves = this.cube.generateScramble()
      const scrambledState = this.cube.saveState()
      const solution = this.cube.getSolution(scrambleMoves)

      // Generate all solution states
      const solutionStatesList = [scrambledState]
      this.cube.restoreState(scrambledState)

      for (const move of solution) {
        this.cube.executeMove(move)
        solutionStatesList.push(this.cube.saveState())
      }

      this.scrambles.push(scrambleMoves)
      this.solutions.push(solution)
      this.scrambleStates.push(scrambledState)
      this.solutionStates.push(solutionStatesList)
    }

    this.createScrambleButtons()
    this.scrambleSelector.style.display = "block"
    this.generateBtn.disabled = true
    this.updateDisplay()
  }

  createScrambleButtons() {
    this.scrambleButtons.innerHTML = ""

    for (let i = 0; i < 5; i++) {
      const button = document.createElement("button")
      button.className = "scramble-btn"
      button.textContent = `Scramble ${i + 1}`
      button.addEventListener("click", () => this.selectScramble(i))
      this.scrambleButtons.appendChild(button)
    }
  }

  selectScramble(index) {
    this.currentScrambleIndex = index
    this.currentMoveIndex = -1

    // Set cube to scrambled state
    this.cube.restoreState(this.scrambleStates[index])
    this.render()
    this.updateScrambleButtons()
    this.updateDisplay()
    this.updateButtons()
  }

  updateScrambleButtons() {
    const buttons = this.scrambleButtons.querySelectorAll(".scramble-btn")
    buttons.forEach((button, index) => {
      button.classList.remove("active", "solved")
      if (index === this.currentScrambleIndex) {
        button.classList.add("active")
      }
      if (this.solvedScrambles.has(index)) {
        button.classList.add("solved")
      }
    })
  }

  nextMove() {
    if (this.currentScrambleIndex === -1) return
    const solution = this.solutions[this.currentScrambleIndex]
    const solutionStates = this.solutionStates[this.currentScrambleIndex]

    if (this.currentMoveIndex < solution.length - 1) {
      this.currentMoveIndex++
      this.cube.restoreState(solutionStates[this.currentMoveIndex + 1])
      this.render()
      this.updateDisplay()
      this.updateButtons()

      // Check if scramble is completely solved
      if (this.currentMoveIndex === solution.length - 1) {
        this.solvedScrambles.add(this.currentScrambleIndex)
        this.updateScrambleButtons()
        this.checkAllCompleted()
      }
    }
  }

  previousMove() {
    if (this.currentScrambleIndex === -1) return
    const solutionStates = this.solutionStates[this.currentScrambleIndex]

    if (this.currentMoveIndex >= 0) {
      this.currentMoveIndex--
      this.cube.restoreState(solutionStates[this.currentMoveIndex + 1])
      this.render()
      this.updateDisplay()
      this.updateButtons()

      // Remove from solved if we go back
      if (this.currentMoveIndex < this.solutions[this.currentScrambleIndex].length - 1) {
        this.solvedScrambles.delete(this.currentScrambleIndex)
        this.updateScrambleButtons()
      }
    }
  }

  updateButtons() {
    if (this.currentScrambleIndex === -1) {
      this.prevBtn.disabled = true
      this.nextBtn.disabled = true
      return
    }

    const solution = this.solutions[this.currentScrambleIndex]
    this.prevBtn.disabled = this.currentMoveIndex < 0
    this.nextBtn.disabled = this.currentMoveIndex >= solution.length - 1
  }

  updateDisplay() {
    if (this.scrambles.length === 0) {
      this.status.textContent = 'Click "Generate 5 Scrambles" to start'
      this.moveInfo.innerHTML = ""
      return
    }

    if (this.currentScrambleIndex === -1) {
      this.status.textContent = "Select a scramble to solve"
      this.moveInfo.innerHTML = `
        <div>5 scrambles generated! Click any scramble button above to start solving.</div>
      `
      return
    }

    const scramble = this.scrambles[this.currentScrambleIndex]
    const solution = this.solutions[this.currentScrambleIndex]
    const isCompleted = this.solvedScrambles.has(this.currentScrambleIndex)

    this.status.textContent = `Solving Scramble ${this.currentScrambleIndex + 1} ${isCompleted ? "(Completed ✓)" : ""}`

    let infoHTML = `
      <div class="scramble-moves">
        <strong>Scramble ${this.currentScrambleIndex + 1}:</strong> ${scramble.join(" ")}
      </div>
    `

   

    const currentMove = this.currentMoveIndex >= 0 ? solution[this.currentMoveIndex] : "Start"
    const nextMove = this.currentMoveIndex < solution.length - 1 ? solution[this.currentMoveIndex + 1] : "Complete"

    infoHTML += `
      <div class="solution-progress">
        <strong>Progress:</strong> ${this.currentMoveIndex + 1} / ${solution.length} moves<br>
        <strong>Last Move:</strong> ${currentMove} | <strong>Next Move:</strong> ${nextMove}
      </div>
    `

    this.moveInfo.innerHTML = infoHTML
  }

 

  reset() {
    this.cube.reset()
    this.scrambles = []
    this.solutions = []
    this.scrambleStates = []
    this.solutionStates = []
    this.solvedScrambles.clear()
    this.currentScrambleIndex = -1
    this.currentMoveIndex = -1

    this.render()
    this.scrambleSelector.style.display = "none"
    this.generateBtn.disabled = false
    this.status.textContent = 'Click "Generate 5 Scrambles" to start'
    this.moveInfo.innerHTML = ""
    this.updateButtons()
  }
}

// Start the application
document.addEventListener("DOMContentLoaded", () => {
  new CubeUI()
})


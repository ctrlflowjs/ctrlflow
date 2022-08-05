const defaultMode = "round"
export function getLineDef(startX, startY, endX, endY, mode = defaultMode) {
  if (mode === "direct") {
    return `
      M ${startX} ${startY}
      L ${endX} ${endY}
    `
  }

  if (mode === "cornered") {
    return `
      M ${startX} ${startY}
      H ${endX}
      V ${endY}
    `
  }

  if (mode === "angled") {
    const curveRadius = 12

    if (Math.abs(startX - endX) < curveRadius * 2 || Math.abs(startY - endY) < curveRadius * 2) {
      return getLineDef(startX, startY, endX, endY, "direct")
    }

    let modX = endX > startX ? 1 : -1
    let modY = endY > startY ? 1 : -1

    return `
      M ${startX} ${startY}
      l ${curveRadius * modX} ${curveRadius * modY}
      h ${endX - startX - (curveRadius * 2 * modX)}
      l ${curveRadius * modX} ${curveRadius * modY}
      v ${endY - startY - (curveRadius * 2 * modY)}
    `
  }

  if (mode === "round") {
    let curveRadius = 14

    if (Math.abs(startX - endX) < curveRadius * 2 || Math.abs(startY - endY) < curveRadius * 2) {
      return getLineDef(startX, startY, endX, endY, "direct")
    }

    let modX = endX > startX ? 1 : -1
    let modY = endY > startY ? 1 : -1

    // curveRadius = 23

    return `
      M ${startX} ${startY}
      q 0 ${curveRadius * modY}, ${curveRadius * modX} ${curveRadius * modY}
      h ${endX - startX - (curveRadius * 2 * modX)}
      q ${curveRadius * modX} 0, ${curveRadius * modX} ${curveRadius * modY}
      v ${endY - startY - (curveRadius * 2 * modY)}
    `
  }
}

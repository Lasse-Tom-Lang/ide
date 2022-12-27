function StandartHighlight(text: string) {
  return text
    .replace(
      / /g,
      "\u00a0"
    )
    .replace(
      /[<]/g,
      "&lt;"
    )
    .replace(
      /[>]/g,
      "&gt;"
    )
}

export default StandartHighlight
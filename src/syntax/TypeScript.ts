import StandartHighlight from "./Standart"

function TypeScriptHighlight(text: string) {
  return StandartHighlight(text)
    .replace(
      /(let|var|const|interface)+\s+(\S*)+\s/g,
      "$1 <span style='color:red;'>$2</span> "
    )
    .replace(
      /(interface|\svar |\slet |\sconst |if|else|function|import|from|await|async|for)/g,
      "<span style='color:orange;'>$1</span>"
    )
    .replace(
      /("([\s\S]*?)")/g,
      "<span style='color:green'>$1</span>"
    )
    .replace(
      /((\/{2})+.*)/g,
      "<span style='color:lightgreen'>$1</span>"
    )
}

export default TypeScriptHighlight
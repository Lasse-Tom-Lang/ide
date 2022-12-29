import StandartHighlight from "./Standart"

function PythonHighlight(text: string) {
  return StandartHighlight(text)
    .replace( // Import keys
      /(import|as|from)\s+(.\S*)/g,
      "$1 <span style='color:red;'>$2 </span>"
    )
    .replace( // Standart commands and keywords
      /(import\s|def\s|if\s|else\s|match\s|case\s|from\s|as\s|None|break\s|while\s|for\s|in\s|not\s|True|False|try:|except:)/g,
      "<span style='color:orange;'>$1</span>"
    )
    .replace( // All strings with ""
      /("([\s\S]*?)")/g,
      "<span style='color:green'>$1</span>"
    )
    .replace( // Function calls
      /(\w*)(\(+.*\))/g,
      "<span style='color:blue'>$1</span>$2"
    )
}

export default PythonHighlight
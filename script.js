var editor;

require(["./vs/editor/editor.main"], function () {
  monaco.editor.defineTheme('myCustomTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#FFFFFF'
    }
  });

  editor = monaco.editor.create(document.getElementById("container"), {
    value: 'print("Olá, Lua!")',
    language: "lua",
    theme: "myCustomTheme",
    dragAndDrop: true,
    minimap: { enabled: true },
    showFoldingControls: "always",
    smoothScrolling: true,
  });
});

function getValue() {
  return editor.getValue();
}

function showPopup(message) {
  var popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.display = "block";
  setTimeout(() => popup.style.display = "none", 3000);
}

function runLuaCode() {
  var code = getValue();
  try {
    var output = fengari.load(code)();
    showPopup(output !== undefined ? output.toString() : "Executado sem saída");
  } catch (error) {
    showPopup("Erro: " + error.message);
  }
}

// Adiciona o evento de clique ao botão
document.getElementById("executeBtn").addEventListener("click", runLuaCode);

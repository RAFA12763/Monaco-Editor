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
        minimap: { enabled: true }
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
        let L = fengari.LUA_INIT();
        fengari.load(code)();
        let output = fengari.tojsstring(fengari.lua_tojsstring(L, -1));
        showPopup(output);
    } catch (error) {
        showPopup("Erro: " + error.message);
    }
}

document.getElementById("executeBtn").addEventListener("click", runLuaCode);

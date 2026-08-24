const isoLayout = [
  ["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BACKSPACE"],
  ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "ENTER"],
  ["CAPSLOCK", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "#"],
  ["SHIFT_LEFT", "\\", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT_RIGHT"],
  ["CTRL_LEFT", "WIN", "ALT", "SPACE", "ALT_GR", "MENU", "CTRL_RIGHT"]
];

const keyboardDiv = document.getElementById("keyboard");

function renderKeyboard() {
  keyboardDiv.innerHTML = "";

  isoLayout.forEach(row => {
    const rowDiv = document.createElement("div");

    row.forEach(key => {
      const keyDiv = document.createElement("div");
      keyDiv.classList.add("key");

      let displayName = key;

      if (key === "SHIFT_LEFT") {
        displayName = "L-SHIFT";
      }

      if (key === "SHIFT_RIGHT") {
        displayName = "R-SHIFT";
      }

      if (key === "CTRL_LEFT") {
        displayName = "CTRL";
      }

      if (key === "CTRL_RIGHT") {
        displayName = "CTRL";
      }
      if (key === "ALT_GR") {
        displayName = "ALT GR";
      }

      keyDiv.textContent = displayName;

      if (key === "BACKSPACE") {
        keyDiv.classList.add("xwide");
      }

      if (key === "TAB" || key === "CAPSLOCK" || key === "ENTER") {
        keyDiv.classList.add("xwide");
      }

      if (key === "SHIFT_LEFT" || key === "SHIFT_RIGHT") {
        keyDiv.classList.add("xwide");
      }

      if (key === "SPACE") {
        keyDiv.classList.add("space");
      }

      keyDiv.dataset.key = key.toLowerCase();

      rowDiv.appendChild(keyDiv);
    });

    keyboardDiv.appendChild(rowDiv);
  });
}

renderKeyboard();

function normalizeKey(e) {
  switch (e.code) {
    case "ShiftLeft":
      return "shift_left";

    case "ShiftRight":
      return "shift_right";

    case "ControlLeft":
      return "ctrl_left";

    case "ControlRight":
      return "ctrl_right";

    case "AltLeft":
      return "alt";

    case "AltRight":
      return "alt_gr";

    case "Backslash":
      return "\\";

    case "Space":
      return "space";

    case "Tab":
      return "tab";

    case "CapsLock":
      return "capslock";

    case "Enter":
      return "enter";

    case "Backspace":
      return "backspace";

    case "Escape":
      return "esc";

    case "MetaLeft":
    case "MetaRight":
      return "win";

    case "ContextMenu":
      return "menu";
  }

  return e.key.toLowerCase();
}

document.addEventListener("keydown", e => {
  const pressed = normalizeKey(e);

  const keyDiv = document.querySelector(
    `.key[data-key="${CSS.escape(pressed)}"]`
  );

  if (keyDiv) {
    keyDiv.classList.add("pressed");
    keyDiv.classList.remove("flash");

    void keyDiv.offsetWidth;

    keyDiv.classList.add("flash");
  }
});
const isoLayout = [
  ["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BACK"],
  ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "ENTER"],
  ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "#"],
  ["SHIFT", "\\", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT"],
  ["CTRL", "WIN", "ALT", "SPACE", "ALT", "MENU", "CTRL"]
];

const keyboardDiv = document.getElementById("keyboard");

function renderKeyboard() {
  keyboardDiv.innerHTML = "";

  isoLayout.forEach(row => {
    const rowDiv = document.createElement("div");

    row.forEach(key => {
      const keyDiv = document.createElement("div");
      keyDiv.classList.add("key");
      keyDiv.textContent = key;

      if (key === "BACK") keyDiv.classList.add("wide");
      if (key === "TAB" || key === "CAPS" || key === "ENTER") keyDiv.classList.add("xwide");
      if (key === "SHIFT") keyDiv.classList.add("xwide");
      if (key === "SPACE") keyDiv.classList.add("space");

      keyDiv.dataset.key = key.toLowerCase();
      rowDiv.appendChild(keyDiv);
    });

    keyboardDiv.appendChild(rowDiv);
  });
}

renderKeyboard();

function normalizeKey(e) {
  const k = e.key.toLowerCase();

  if (k === " ") return "space";
  if (k === "shift") return "shift";
  if (k === "control") return "ctrl";
  if (k === "altgraph") return "alt";
  if (k === "meta") return "win";
  
  return k;
}

document.addEventListener("keydown", e => {
  const pressed = normalizeKey(e);
  const keyDiv = document.querySelector(`.key[data-key="${pressed}"]`);

  if (keyDiv) {
    keyDiv.classList.add("pressed");
    keyDiv.classList.remove("flash");
    void keyDiv.offsetWidth;
    keyDiv.classList.add("flash");
  }
});

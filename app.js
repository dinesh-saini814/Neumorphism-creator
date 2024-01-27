const box = document.getElementById("neumorphism-box");
const radiusInput = document.getElementById("radius");
const blurInput = document.getElementById("blur");
const distanceInput = document.getElementById("distance");
const colorInput = document.getElementById("color");

function updateBox() {
  const radius = radiusInput.value + "%";
  const blur = blurInput.value + "px";
  const distance = distanceInput.value + "px";
  const color = colorInput.value;

  box.style.borderRadius = radius;
  box.style.boxShadow = ` ${distance} ${distance} ${blur} ${color}, -${distance} -${distance} ${blur} ${color}`;
}

radiusInput.addEventListener("input", updateBox);
blurInput.addEventListener("input", updateBox);
distanceInput.addEventListener("input", updateBox);
colorInput.addEventListener("input", updateBox);

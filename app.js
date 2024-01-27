const box = document.getElementById("neumorphism-box");
const radiusInput = document.getElementById("radius");
const blurInput = document.getElementById("blur");
const distanceInput = document.getElementById("distance");
const colorInput = document.getElementById("color");
const intensityInput = document.getElementById("intensity");

function updateBox() {
  const radius = radiusInput.value + "px";
  const blur = blurInput.value + "px";
  const distance = distanceInput.value + "px";
  const Boxcolor = colorInput.value;
  const intensity = intensityInput.value;

  // Map the intensity value to a color value
  const color = interpolateColor("#dedede", "#5a5a5a", intensity);
  box.style.background = Boxcolor;
  box.style.borderRadius = radius;
  box.style.boxShadow = ` ${distance} ${distance} ${blur} ${color}, -${distance} -${distance} ${blur} ${color}`;
}

radiusInput.addEventListener("input", updateBox);
blurInput.addEventListener("input", updateBox);
colorInput.addEventListener("input", updateBox);
intensityInput.addEventListener("input", updateBox);
distanceInput.addEventListener("input", function () {
  // Set the blur input value to be double the distance input value
  blurInput.value = distanceInput.value * 2;
  // Trigger the updateBox function to reflect the changes
  updateBox();
});

// Function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  let result = color1
    .slice(1)
    .match(/.{2}/g)
    .map((hex) => parseInt(hex, 16))
    .map((val, i) =>
      Math.floor(
        val + factor * (parseInt(color2.slice(1).match(/.{2}/g)[i], 16) - val)
      )
    )
    .map((val) => val.toString(16).padStart(2, "0"))
    .join("");
  return "#" + result;
}
function updateCode() {
  const radius = radiusInput.value + "px";
  const blur = blurInput.value + "px";
  const distance = distanceInput.value + "px";
  const intensity = intensityInput.value;
  const color = interpolateColor("#dedede", "#5a5a5a", intensity);

  const codeElement = document.querySelector("pre code");
  codeElement.innerHTML = `<span class="token">border-radius</span><span class="token values">:</span> ${radius}<span class="token values">;</span>
<span class="token">background</span><span class="token values">:</span> #e0e0e0<span class="token values">;</span>
<span class="token">box-shadow</span><span class="token values">:</span>  ${distance} ${distance} ${blur} ${color}<span class="token values">,</span>
            -${distance} -${distance} ${blur} ${color}<span class="token values">;</span>`;
}

// Call updateCode whenever any input changes
radiusInput.addEventListener("input", updateCode);
blurInput.addEventListener("input", updateCode);
distanceInput.addEventListener("input", updateCode);
intensityInput.addEventListener("input", updateCode);

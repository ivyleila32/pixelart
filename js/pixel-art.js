var paleta = document.getElementById("paleta");
var grillaPixeles = document.getElementById("grilla-pixeles");
var selectorColor = document.getElementById("indicador-de-color");
var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var mouseApretado = false;
var grillaDivs = [];
var operaciones = [];




// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');


$(colorPersonalizado).change(function () {
  // Se guarda el color de la rueda en colorActual

  colorActual = colorPersonalizado.value;
  // Completar para que cambie el indicador-de-color al colorActual
  selectorColor.style.backgroundColor = colorActual;

});


function recorrerColores(colores) {
  for (i = 0; i < nombreColores.length; i++) {
    var newDiv = document.createElement("div");
    newDiv.classList.add('color-paleta');
    newDiv.style.backgroundColor = nombreColores[i];
    paleta.appendChild(newDiv);
  }
}

function grilla() {
  for (i = 0; i < 1750; i++) {
    let newDiv = document.createElement("div");
    grillaDivs.push(newDiv);
    grillaPixeles.appendChild(newDiv);
  }
}

function pintar(elemento, colorNuevo) {
  if (elemento.style.backgroundColor === colorNuevo) {
    return false;
  }
  const operacion = {
    anterior: elemento.style.backgroundColor,
    nuevo: colorNuevo,
    elemento: elemento,

  };
  operaciones.push(operacion);
  elemento.style.backgroundColor = colorNuevo;
}

function iniciar() {
  recorrerColores();
  grilla();
}

$(paleta).click(function (e) {
  selectorColor.style.backgroundColor = e.target.style.backgroundColor;
});

$(grillaPixeles).click(function (e) {
  pintar(e.target, selectorColor.style.backgroundColor);
});

$(document).mousedown(function (e) {
  event.preventDefault()
  mouseApretado = true;
}
);

$(document).mouseup(function (e) {
  mouseApretado = false;
}
);

$(grillaPixeles).mouseover(function (e) {
  if (mouseApretado) {
    pintar(e.target, selectorColor.style.backgroundColor);
  }
});

$('#borrar').click(function () {
  $(grillaDivs).animate({
    backgroundColor: '#fff',
  }, 1500);
})



$('#guardar').click(function () {
  guardarPixelArt();
});

$('.imgs img').click(function () {
  switch ($(this).attr('id')) {
    case "batman":
      cargarSuperheroe(batman)
      break;

    case "wonder":
      cargarSuperheroe(wonder)
      break;

    case "flash":
      cargarSuperheroe(flash)
      break;

    case "invisible":
      cargarSuperheroe(invisible)
      break;

    default:
      break;
  }

});
// MEJORAS
$('#deshacer').click(function (e) {
  const operacion = operaciones.pop();
  if (operacion) {
    console.log(operacion.elemento.style.backgroundColor, operacion.anterior);
    operacion.elemento.style.backgroundColor = operacion.anterior;
  }
});

iniciar();




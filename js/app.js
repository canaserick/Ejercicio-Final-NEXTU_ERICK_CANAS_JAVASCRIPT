var calculadora =  {
  operacion : "suma",
  valor1 : 0,
  valor2 : 0,
  resultado : 0,

  init: function(){
    //this.clickTeclas1()
    this.clickTeclas()
  },

  clickTeclas: function(){
      var teclas = document.getElementsByClassName('tecla')
      for (var i = 0; i < teclas.length; i++){
        teclas[i].addEventListener('mousedown', function(e){
          e.target.src = "image/" + e.target.id + "ck.png"
        })
        teclas[i].addEventListener('mouseup', function(e){
          e.target.src = "image/" + e.target.id + ".png"
        })
        teclas[i].addEventListener('click', function(e){
          var pantalla = document.getElementById("display")
          if (parseInt(e.target.id) < 10){
              calculadora.clickTeclasNumericas(e, pantalla)
          }
          if (e.target.id == "punto"){
              calculadora.clickPunto(e, pantalla)
          }
          if (e.target.id == "sign"){
              calculadora.clickSign(e, pantalla)
          }
          if (e.target.id == "on"){
              calculadora.clickOn(e, pantalla)
          }

          // operaciones matematicas
          if ((e.target.id == "mas") || (e.target.id == "menos") ||
              (e.target.id == "por") || (e.target.id == "dividido")){
            calculadora.valor1 = parseFloat(pantalla.innerHTML)
            pantalla.innerHTML = "0"
            switch (e.target.id){
              case "mas":
                calculadora.operacion = "suma"
                break;
              case "menos":
                calculadora.operacion = "resta"
                break;
              case "por":
                calculadora.operacion = "multiplicacion"
                break;
              case "dividido":
                calculadora.operacion = "division"
                break;

            }
          }
          if (e.target.id == "igual"){
            calculadora.valor2 = parseFloat(pantalla.innerHTML)
            switch (calculadora.operacion){
              case "suma":
                calculadora.resultado = calculadora.suma(calculadora.valor1, calculadora.valor2)
                break;
              case "resta":
                calculadora.resultado = calculadora.resta(calculadora.valor1, calculadora.valor2)
                break;
              case "multiplicacion":
                calculadora.resultado = calculadora.multiplicacion(calculadora.valor1, calculadora.valor2)
                break;
              case "division":
                calculadora.resultado = calculadora.division(calculadora.valor1, calculadora.valor2)
                break;
            }
            calculadora.valor1 = calculadora.resultado
            pantalla.innerHTML = calculadora.resultado
          }
          // ajusto el numero maximo de digitos
          calculadora.valMaxDigitos(pantalla)
        })
      }
    },

    clickTeclasNumericas: function  (e, pantalla){
      if(parseInt(pantalla.innerHTML) == 0){
        if(parseInt(e.target.id) > 0){
          pantalla.innerHTML = e.target.id
        }
      } else {
        pantalla.innerHTML = pantalla.innerHTML + e.target.id
      }
    },

    clickPunto: function (e, pantalla){
      if(!pantalla.innerHTML.includes(".")){
        pantalla.innerHTML = pantalla.innerHTML + "."
      }
    },

    clickSign: function (e, pantalla){
      if(parseInt(pantalla.innerHTML) != 0){
        if(!pantalla.innerHTML.includes("-")){
          pantalla.innerHTML = "-" + pantalla.innerHTML
        } else {
          pantalla.innerHTML = pantalla.innerHTML.substr(1)
        }
      }
    },

    clickOn: function (e, pantalla){
      pantalla.innerHTML = 0
    },

    valMaxDigitos: function (pantalla){
      if(pantalla.innerHTML.length > 7){
        pantalla.innerHTML = pantalla.innerHTML.substring(0,8)
      }
    },

    suma: function (valor1, valor2){
      return (valor1 + valor2)
    },
    resta: function (valor1, valor2){
      return (valor1 - valor2)
    },
    multiplicacion: function (valor1, valor2){
      return (valor1 * valor2)
    },
    division: function (valor1, valor2){
      return (valor1 / valor2)
    }

} // Cierra la clase calculadora



calculadora.init()

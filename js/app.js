var calculadora =  {
  operacion : "suma",
  valor1 : 0,
  valor2 : 0,
  resultado : 0,
  valor2Ant : 0,
  operacionAnt : "suma",

  init: function(){
    //this.clickTeclas1()
    this.clickTeclas()
  },

  clickTeclas: function(){
      var teclas = document.getElementsByClassName('tecla')
      for (var i = 0; i < teclas.length; i++){
        //lisener del evento mousedown
        teclas[i].addEventListener('mousedown', function(e){
          e.target.src = "image/" + e.target.id + "ck.png"
        })
        //listener del mousedown
        teclas[i].addEventListener('mouseup', function(e){
          e.target.src = "image/" + e.target.id + ".png"
        })
        //listener del evento click
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
          //mostrar resultado cuando se presiona la tecla igual
          if (e.target.id == "igual"){
            if (calculadora.operacion == 'igual'){
                calculadora.valor2 = calculadora.valor2Ant
                calculadora.operacion = calculadora.operacionAnt
            } else {
              calculadora.valor2 = parseFloat(pantalla.innerHTML)
              }
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
            calculadora.valor2Ant = calculadora.valor2
            calculadora.operacionAnt = calculadora.operacion
            calculadora.operacion = 'igual'
            pantalla.innerHTML = calculadora.resultado
          }
          // ajusto el numero maximo de digitos
          calculadora.valMaxDigitos(pantalla)
        })
      }
    },
    //metodo para las teclas numericas
    clickTeclasNumericas: function  (e, pantalla){
      if((parseFloat(pantalla.innerHTML) == 0) && (!pantalla.innerHTML.includes("."))){
        if(parseInt(e.target.id) > 0){
          pantalla.innerHTML = e.target.id
        }
      } else {
        pantalla.innerHTML = pantalla.innerHTML + e.target.id
      }
    },
    //metodo para el punto
    clickPunto: function (e, pantalla){
      if(!pantalla.innerHTML.includes(".")){
        pantalla.innerHTML = pantalla.innerHTML + "."
      }
    },
    //metodo para el signo
    clickSign: function (e, pantalla){
      if(parseFloat(pantalla.innerHTML) != 0){
        if(!pantalla.innerHTML.includes("-")){
          pantalla.innerHTML = "-" + pantalla.innerHTML
        } else {
          pantalla.innerHTML = pantalla.innerHTML.substr(1)
        }
      }
    },
    //metodo para la tecla ON
    clickOn: function (e, pantalla){
      pantalla.innerHTML = 0
    },
    //metodo que valida el numero maximo de digitos
    valMaxDigitos: function (pantalla){
      if(pantalla.innerHTML.length > 7){
        pantalla.innerHTML = pantalla.innerHTML.substring(0,8)
      }
    },
    // operaciones matematicas`
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


//Inicializa la calculadora
calculadora.init()

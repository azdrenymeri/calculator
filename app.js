//DOM elements
var screen = document.getElementsByClassName("screen");
var keys = document.getElementsByClassName("key");
var screen = document.querySelector(".screen");
var backSpace = document.querySelector(".back-space");
var clear = document.querySelector(".ce");
var operators = document.getElementsByClassName("operator");
var add = document.querySelector(".add");
var multiply = document.querySelector(".multiply");
var subtract = document.querySelector(".subtract");
var divide = document.querySelector(".divide");
var equals = document.querySelector(".equals");
var plusMinus = document.querySelector(".plus-minus");
var dot = document.querySelector(".dot");

//globals
var firstTimeLaunch = true;
var firstNumber;
var secondNumber;
var operat;


// handlers
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", keyClick);
}
for (var i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", op);
}

backSpace.addEventListener("click", backSpaceClick);
clear.addEventListener("click", clearScreen);
equals.addEventListener("click", resultEquals);
plusMinus.addEventListener("click", plusMinusClicked);
dot.addEventListener("click", dotCliked)
screen.addEventListener("onchange",screenChange);

document.addEventListener('keydown',function(e){
  
    switch(e.key){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            keyPress(e.key);
        break
        
        case "+":
        case "-":
        case "*":
        case "/":
            operatorPress(e.key);
        break;
        case '=':
            resultEquals()
        break;
        case ".":
            dotCliked()
        break;
        case "Backspace":
            backSpaceClick()
        break;
    }
    
});

//functions
function keyClick() {
    var text = this.getAttribute("data-key");


    if (firstTimeLaunch) {
        firstTimeLaunch = false;
        screen.textContent = "" + text;
    } else if (screen.textContent == "0") {
        screen.textContent = text;
    } else {
        screen.textContent += text;
    }

};

function backSpaceClick() {
    if (screen.textContent.length < 2) {
        screen.textContent = 0;
    } else {
        if (screen.textContent == "0") {
            screen.textContent = "";
        }
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
    }

}

function clearScreen() {
    screen.textContent = "0";
    firstNumber = undefined;
    secondNumber = undefined;
    operat = undefined;

}



function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            return "Wrong";
    };

    function add(num1, num2) {
        return Number(num1) + Number(num2);
    };

    function subtract(num1, num2) {
        return Number(num1) - Number(num2);
    };

    function multiply(num1, num2) {
        return Number(num1) * Number(num2);
    };

    function divide(num1, num2) {
        return Number(num1) / Number(num2);
    };
}

function op() {
    if (operat == undefined) {
        firstNumber = screen.textContent;
        operat = this.getAttribute("data-key");
        screen.textContent += operat;
    }
}

function resultEquals() {
    if (firstNumber != undefined && operat != undefined) {
        var scrText = screen.textContent.split(operat);
        secondNumber = scrText[1];
        screen.textContent = "";
        screen.textContent = operate(operat, firstNumber, secondNumber);
        firstNumber = undefined;
        secondNumber = undefined;
        operat = undefined;
    }

}

function plusMinusClicked() {
    if(screen.textContent != '0'){
        if (firstNumber == undefined && operat == undefined && secondNumber == undefined) {
            var number = screen.textContent;
            if (!number.startsWith("-")) {
                number = "-" + number;
            } else {
                number = number.slice(1);
            }
            screen.textContent = number;
        } else if (firstNumber != undefined && operat == undefined) {
            var number = screen.textContent;
            if (!number.startsWith("-")) {
                number = "-" + number;
            } else {
                number = number.slice(1);
            }
            screen.textContent = number;
        } else if (firstNumber != undefined && operat != undefined) {
            var scrT = screen.textContent.split(operat);
            var number = scrT[1];



            if (number != "") {
                if (!number.trim().startsWith("-")) {
                    number = "-" + number;
                    screen.textContent = firstNumber + "" + operat + "" + number;
                } else {
                    number = number.trim();
                    number = number.slice(1);
                    screen.textContent = firstNumber + "" + operat + "" + number;
                }

            }

        }
    }
    
}

function dotCliked() {

    if (firstNumber == undefined && operat == undefined && secondNumber == undefined) {
        var number = screen.textContent;


        if (number.indexOf(".") == -1) {
            number = number + ".";

        } else {
           
            var number_arr = number.split(".");
            if(number_arr[1] === ''){
                number = number_arr[0];
            }
            
            
        }

        screen.textContent = number;


    } else if (firstNumber != undefined && operat != undefined) {
        var scrT = screen.textContent.split(operat);
        var number = scrT[1];



        if (number != undefined) {
            if (number.trim().indexOf(".") == -1) {
                number = number + ".";
                screen.textContent = firstNumber + "" + operat + "" + number;
            } else {
                var number_arr = number.split(".");
                console.log(number_arr);
                
                if(number_arr[1] === ''){
                    number = number_arr[0];
                    screen.textContent = firstNumber + "" + operat + "" + number;
                }
            }
        }
       
    }
}

function screenChange(){
    console.log("text changed on screen");
    
}

function keyPress(key){
    if(firstTimeLaunch){
        firstTimeLaunch = false;
        screen.textContent = ""+key;
    }else if(screen.textContent === '0'){
        screen.textContent = key;
    }else{
        screen.textContent += key;
    }
}
function operatorPress(operation){
    if (operat == undefined) {
        firstNumber = screen.textContent;
        operat = operation;
        screen.textContent += operat;
    }
}


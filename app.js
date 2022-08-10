
function buttonDo(id){
    this.id = id;
    //alert(id);
    element =  document.getElementById(id).classList
    element.add('press'); //sucht das Element mit der ID "add und fügt bei der class "press" hinzu
    element.remove('nonPress'); //entfernt die bereits vorhandene Zeichenkette "nonPress"
    setTimeout(function(){      //Umkehrung des Prozesses nach 100ms (Button bewegt sich / erhält eine Druck-Animation)
        document.getElementById(id).classList.toggle('nonPress')
        document.getElementById(id).classList.remove('press');
    }, 100)

    //document.getElementById("notes").innerHTML += `<Button id="note" onclick="doSomething()">• muss los</Button> `
}


function doSomething(n){
    /*
    this.text = text;
    alert(text);
    console.log(text)
    */
    this.n = n;
    var element = document.getElementById(`note${n}`).classList;
    element.toggle('fadeOut');
    setTimeout(()=> {
        document.getElementById(`note${n}`).parentNode.removeChild(document.getElementById(`note${n}`))
    }, 1500);
}

function escapeHtml(text) { //Ersetzt Sonderzeichen. Schutz gegen injection. thx jbo5112. Funktioniert nicht ;( -> funktioniert doch, jedoch erkennt Firefox die Codierung
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    newText = text.replace(/[&<>"']/g, function(m) { return map[m]; });
    doneText = newText.toString();
    return doneText;
}



let n = 0;

function submitBtnDo(id){
    this.id = id; //Die id wird benötigt um festzustellen, welcher Button gedrückt wurde und somit die Animation ausführen muss.
    var text = document.getElementById("inputfield").value;
    
    if (id != undefined){
        buttonDo(id);
    }

    if(text != ""){
        var newText = escapeHtml(text);
        //Fügt die Aufgabe als Button hinzu:
        document.getElementById("notes").innerHTML += `<Button id="note${n}" class="active" onclick="doSomething(${n})">• ${newText}</Button> `;
        n += 1;
        document.getElementById("inputfield").value = "";
    }
}


document.addEventListener("keypress", function(event){ //Mit Enter soll eine Aufgabe hinzugefügt werden.
        if (event.key === "Enter"){
            submitBtnDo();
    }
});



//Bei einem Reload der Seite wird der Inhalt des Textboxes gelöscht.
window.onload = function() {
    document.getElementById("inputfield").value = '';
    }
  
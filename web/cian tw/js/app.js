$(document).ready(function(){
    var inputActivo = false;
    var mostrarInput = function(){
        inputActivo = !inputActivo;
        if (inputActivo){
            $('.first').animate({
                height: '230px',
            }, 300)
        } else {
            $('.first').animate({
                height: '60px',
            }, 300)
        }
    }
    var enviarTweet = function(){
        var textarea = $('#tweetcontent')
        var tweet = textarea.val()
        $('#timeline').prepend('<li><b>' + nombre + ':</b> ' + tweet + '</li>')
        textarea.val('')
        textarea.focus()
    }

    var nombre = ''
    var pedirNombre = function(){
        nombre = prompt('¿Cual es tu nombre?')
    }()

    $('#nuevo').click(function(){
        mostrarInput();
    })

    $('#tweet').click(function(){
        enviarTweet();
    })
})

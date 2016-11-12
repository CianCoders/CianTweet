$(document).ready(function(){
    // animaciones
    var inputActivo = false;
    var mostrarInput = function(){
        inputActivo = !inputActivo
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


    // template
    var tweetId = 1
    var tweetTemplate
    var templateListo = false

    $.get('templates/tweet.html', function(data){
        tweetTemplate = Handlebars.compile(data)
        templateListo = true
    })


    // tweet
    var enviarTweet = function(){
        var textarea = $('#tweetcontent')
        var tweet = textarea.val()

        // renderizar
        if (templateListo){

            var html = tweetTemplate({
                id: tweetId,
                tweet: tweet,
                usuario: nombre,
            });
            var newTweet = $(html)

            // iniciar escondido
            newTweet.hide()
            $('#timeline').prepend(newTweet)
            // mostrar
            newTweet.fadeIn(500)
            tweetId += 1
        }

        // reset y focus del tweet
        textarea.val('')
        textarea.focus()
    }

    // API
    var obtenerTweets = function(){
        $.getJSON('/tweets', function(data){
            console.log('tweets!', data);
        })
    }
    obtenerTweets()

    // nombre
    var nombre = ''
    var pedirNombre = function(){
        nombre = prompt('¿Cual es tu nombre?')
    }()

    // handlers
    $('#nuevo').click(function(){
        mostrarInput();
    })

    $('#tweet').click(function(){
        enviarTweet();
    })
})

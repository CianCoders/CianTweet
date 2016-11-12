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

    // API
    var obtenerTweets = function(){
        $.getJSON('/tweets', function(data){
            console.log('tweets!', data);
            data.data.map(function(tweet){
                var data = {
                    id: tweet._id,
                    tweet: tweet.tweet,
                    usuario: tweet.usuario,
                }
                renderizarTweet(data)
            })
        })
    }()


    // tweet
    var renderizarTweet = function(data){
        // renderizar
        if (templateListo){
            var html = tweetTemplate(data);
            var newTweet = $(html)

            // iniciar escondido
            newTweet.hide()
            $('#timeline').prepend(newTweet)
            // mostrar
            newTweet.fadeIn(500)
        }
    }

    var enviarTweet = function(){
        var textarea = $('#tweetcontent')
        var tweet = textarea.val()

        // renderizar tweet
        var data = {
            id: tweetId,
            tweet: tweet,
            usuario: nombre,
        }
        tweetId += 1

        // reset y focus del tweet
        textarea.val('')
        textarea.focus()
    }

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

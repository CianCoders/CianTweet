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

    // API REALTIME
    var socket = io('/')
    var app = feathers()
      .configure(feathers.hooks())
      .configure(feathers.socketio(socket))

    var tweetService = app.service('tweets')
    tweetService.on('created', function(tweet) {
        if (!tweetsIds[tweet._id]){
            var data = {
                id: tweet._id,
                tweet: tweet.tweet,
                usuario: tweet.usuario,
            }
            renderizarTweet(data)
            tweetsIds[tweet._id] = true
        }
    });

    var tweetsIds = {}
    var obtenerTweets = function(){
        $.getJSON('/tweets', function(data){
            data.data.map(function(tweet){
                if (!tweetsIds[tweet._id]){
                    var data = {
                        id: tweet._id,
                        tweet: tweet.tweet,
                        usuario: tweet.usuario,
                    }
                    renderizarTweet(data)
                    tweetsIds[tweet._id] = true
                }
            })
        })
    }
    obtenerTweets()

    var postTweet = function(data){
        $.post('/tweets', data)
            .done(function(data){
            })
            .fail(function(){
              console.log('post fallido!')
            })
    }


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
            tweet: tweet,
            usuario: nombre,
        }
        postTweet(data)

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

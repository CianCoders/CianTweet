'use strict';
import errors from 'feathers-errors';

module.exports = function() {
  return function(hook) {
    const tweet = hook.result.tweet
    const moverDerecha = tweet.search('#derecha') >= 0
    const moverIzquierda = tweet.search('#izquierda') >= 0
    const inc = 10

    if ((moverDerecha || moverIzquierda) && (hook.app.board.isReady)) {
      let deg = hook.app.servoDeg
      if (moverIzquierda) {
        deg += inc
        if (deg > 180){
          deg = 180
        }
      } else if (moverDerecha){
        deg -= inc
        if (deg < 0) {
          deg = 0
        }
      }
      hook.app.servoDeg = deg
      hook.app.servo.to(deg)
    }
  };
};

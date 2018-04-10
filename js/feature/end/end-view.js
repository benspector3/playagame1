(function(opspark, createjs, draw, _) {
  const
    button = opspark.factory.component.button,
    layout = opspark.factory.component.layout;
    
  // create a namespace for the end view //
  _.set(opspark, 'playa.end', 
  /**
   * Creates and returns the end view.
   */
  function(game) {
    const
      canvas = game.canvas,
      
      /*
       * asset is the parent Container for this view. Use
       * asset.addChild() to add child components to the view.
       */
      asset = new createjs.Container();
    
    // create view components here //
    const
      btnLobby = button('LOBBY', '#5cb85c', '#4cae4c', true),
      background = draw.roundRect(
        400,
        400,
        4,
        '#FFF',
        '#CCC',
        1),
      textfield = draw.textfield('GAME OVER', 'bold 60px Arial', '#CCC', 'left');
    
    // add all view components to the view container //
    asset.addChild(background, textfield, btnLobby);
    
      
    /**
     * Called when the asset is added to the stage.
     * Use render() to config and position components.
     */
    function render() {
      canvas.style.backgroundColor = '#BBB';
      
      asset.alpha = 0;
      
      var tfb = textfield.getBounds();
      textfield.x = (background.width - tfb.width) / 2;
      textfield.y = (background.height - tfb.height) / 2 - btnLobby.getBounds().height;
      
      asset.x = (canvas.width - background.width) / 2;
      asset.y = (canvas.height - background.height) / 2;
      
      btnLobby.x = 10;
      btnLobby.y = textfield.y + tfb.height + 10;

    }
    
    // called on screen resize //
    function liquify() {
      return createjs.Tween.get(asset, { loop: false })
          .to({ x: (canvas.width - background.width) / 2, y: (canvas.height - background.height) / 2 }, 700, createjs.Ease.getPowInOut(4));
    }

    // setup a one-time added-to-parent listener //
    asset.on('added', onAdded);
    function onAdded() {
      if(game.getDebug()) console.log('end view added to stage');
      asset.off('added', onAdded);
      render();
    }

    /*
     * Return the view API: It MUST expose the asset, the render method, and 
     * the liquify method. However, any other child components or API needed 
     * to control this view can be exposed.
     */
    return {
      asset,
      render,
      liquify,
      btnLobby,
      open() {
        return createjs.Tween.get(asset, { loop: false })
          .to({ alpha: 1 }, 500, createjs.Ease.getPowInOut(4));
      },
      close() {
        return createjs.Tween.get(asset, { loop: false })
          .to({ alpha: 0 }, 200, createjs.Ease.getPowInOut(4))
      },
    };
  }
  );
}(window.opspark, window.createjs, window.opspark.draw, window._));

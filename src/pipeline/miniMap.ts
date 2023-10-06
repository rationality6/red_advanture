// class CustomPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
//   constructor(game: Phaser.Game) {

//     super({
//       game: game,
//       fragShader: `
//             precision mediump float;
//             uniform sampler2D uMainSampler;
//             varying vec2 outTexCoord;

//             void main(void)
//             {
//                 if (length(outTexCoord.xy - vec2(0.5, 0.5)) > 0.5) {
//                     discard;
//                 } else {
//                     gl_FragColor = texture2D(uMainSampler, outTexCoord);
//                 }
//             }
//     `,
//     });
//   }
// }

// export default CustomPipeline
export default new Phaser.Class({
  Extends: Phaser.Renderer.WebGL.Pipelines.SinglePipeline,

  initialize: function CustomPipeline(game) {
    Phaser.Renderer.WebGL.Pipelines.SinglePipeline.call(this, {
      game: game,
      renderer: game.renderer,
      fragShader: `
                precision mediump float;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
               
    
                void main(void)
                {
                    if (length(outTexCoord.xy - vec2(0.5, 0.5)) > 0.5) {
                        discard;
                    } else {
                        gl_FragColor = texture2D(uMainSampler, outTexCoord);
                    }
                }   
        `,
    });
  },
});

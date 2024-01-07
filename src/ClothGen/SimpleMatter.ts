import * as Matter from 'matter-js';

export class SimpleMatter {
    // module aliases
Engine = Matter.Engine;
Render = Matter.Render;
Runner = Matter.Runner;
Bodies = Matter.Bodies;
Composite = Matter.Composite;

// create an engine
engine = this.Engine.create();

// create a renderer
render = this.Render.create({
    element: document.body,
    engine: this.engine,
    options: {
        background: '#ffffff',
    }
});

// create two boxes and a ground
boxA = this.Bodies.rectangle(400, 200, 80, 80);
boxB = this.Bodies.rectangle(450, 50, 80, 80);
ground = this.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

constructor(){
// add all of the bodies to the world
this.Composite.add(this.engine.world, [this.boxA, this.boxB, this.ground]);

// run the renderer
this.Render.run(this.render);

// create runner
var runner = this.Runner.create();

// run the engine
this.Runner.run(runner, this.engine);
console.log(runner);
}

}
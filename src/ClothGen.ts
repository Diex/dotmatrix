import * as Matter from 'matter-js';

export class ClothGen {
    
    runner: Matter.Runner;
    engine = Matter.Engine.create({
        gravity: { x: 0, y: 0.5 },    
    });
    
    world = this.engine.world;
    mouse: Matter.Mouse;
    mouseConstraint: Matter.MouseConstraint;

    cloth = this.createCloth(100, 100, 64, 32, 0, 0, false, 15.875);
    // cloth = this.createCloth(100, 100, 128, 128, 0, 0, false, 7.875);
    constructor(canvas: HTMLCanvasElement) {
        console.log("ClothGen constructor");        
        
        let width = this.cloth.bodies[31].position.x - this.cloth.bodies[0].position.x;    
        console.log(width);

        let last = 63;

        let mod1 = -0.25; // * Math.random() * 0.5 + 0.5;
        let mod2 = 0.21;// * Math.random() * 0.5 + 0.5;
        let amp = 50;
        let widen = 0;

        let startx = this.cloth.bodies[0].position.x - widen;
        let endx = this.cloth.bodies[last].position.x + widen;
        let step = (endx - startx) / (last+1);
        for (var i = 0; i < last+1; i++) {
            // this.cloth.bodies[i].isStatic = Math.random() < 0.5 ? true : false;
            let offset = Math.sin(i/30*2*Math.PI*mod2) * Math.sin(i/30*2*Math.PI*mod1) * -amp
            // let offset =  Math.sin(i/30*2*Math.PI*mod1) * -amp
            // let offset = 0;
            // console.log(offset);
            Matter.Body.translate(this.cloth.bodies[i],{x: 0, y: offset }); 
            Matter.Body.setPosition(this.cloth.bodies[i],{x: startx + i * step, y: this.cloth.bodies[i].position.y });
            this.cloth.bodies[i].isStatic = true;        
        }
        
        // this.cloth.bodies[0].isStatic = true;        
        // this.cloth.bodies[63].isStatic = true;

        // 
        
        


        Matter.Composite.add(this.world, [
            this.cloth,
            // Matter.Bodies.circle(300, 500, 80, { isStatic: true, render: { fillStyle: '#060a19' } }),
            // Matter.Bodies.rectangle(500, 480, 80, 80, { isStatic: true, render: { fillStyle: '#060a19' } }),
            // Matter.Bodies.rectangle(400, 609, 800, 50, { isStatic: true })
        ]);

        this.mouse = Matter.Mouse.create(canvas),
            this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
                mouse: this.mouse,
                constraint: {
                    stiffness: 0.98,
                    render: {
                        visible: false
                    }
                }
            });

        Matter.Composite.add(this.world, this.mouseConstraint);
           this.runner = Matter.Runner.run(Matter.Runner.create(), this.engine);


     
    }


    /**
* Creates a simple cloth like object.
* @method cloth
* @param {number} xx
* @param {number} yy
* @param {number} columns
* @param {number} rows
* @param {number} columnGap
* @param {number} rowGap
* @param {boolean} crossBrace
* @param {number} particleRadius
* @param {} particleOptions
* @param {} constraintOptions
* @return {composite} A new composite cloth
*/
    createCloth (
        xx: number, yy: number, columns: number, rows: number, 
        columnGap: number, rowGap: number, 
        crossBrace: boolean, 
        particleRadius: number) {

        var Body = Matter.Body,
            Bodies = Matter.Bodies,            
            Composites = Matter.Composites;

        var group = Body.nextGroup(true);
    
        let particleOptions = Matter.Common.extend(
            {   inertia: 0, 
                friction: 1, 
                collisionFilter: { group: group }, 
                render: { visible: false },
                label: 'Cloth Point Particle',
                setDensity: 0.0000000001,

            }, true);

        let constraintOptions = Matter.Common.extend(
            { 
                stiffness: 0.8, 
                damping: 0.9,
                render: { type: 'line', anchors: false } 
            }, true);
        
        var cloth = Composites.stack(
            xx, yy, columns, rows, columnGap, rowGap, 
            function (x: number, y: number) {
                // let particle = Bodies.circle(x, y, particleRadius, particleOptions, 4);
                let particle = Bodies.rectangle(x, y, particleRadius, particleRadius, particleOptions);
                return particle;
            });

            // console.log(cloth.bodies[0].position.x, cloth.bodies[9].position.x)

       let mesh = Composites.mesh(cloth, columns, rows, crossBrace, constraintOptions);

        cloth.label = 'Cloth Body';

        // console.log(mesh)
        return mesh;

    };

}
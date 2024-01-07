import { Composite } from "matter-js";
import * as Cloth from "./ClothGen";
import * as Paper from "paper";

export class Sketch {
    
    cloth: Cloth.ClothGen; 
    objects: any[] = [];
    constraints: any[] = [];

    constructor(canvas: HTMLCanvasElement) {
        console.log("Sketch constructor");
        this.cloth = new Cloth.ClothGen(canvas);
        this.createGridLines(this.cloth.cloth);
    }

    
    createGridLines(cloth: Composite) {
       
        // for (let i = 0; i < cloth.constraints.length; i++) {
        //     let constraint = cloth.constraints[i];
        //     let path = new Paper.Path.Line(
        //         new Paper.Point(constraint.bodyA.position.x, constraint.bodyA.position.y), 
        //         new Paper.Point(constraint.bodyB.position.x, constraint.bodyB.position.y));
        //     path.strokeColor = 'black';
        //     path.strokeWidth = 0.3;
        //     this.constraints.push({ path: path, constraint: constraint });
        // }


        for (let i = 0; i < cloth.bodies.length; i++) {
            let body = cloth.bodies[i];
            let ledRadius = 1.425;
            let particle = new Paper.Path.Circle(new Paper.Point(body.position.x, body.position.y), ledRadius);
            particle.strokeColor = 'black';
            particle.fillColor = 'white';            
            particle.strokeWidth = 0.05;            
            this.objects.push({ particle: particle, body: body});
        }

        
        // console.log(this.objects);
    }

    render() {
        
        this.objects.forEach((obj) => {
            let particle = obj.particle;
            let body = obj.body;
            particle.position = new Paper.Point(body.position.x, body.position.y);
        })

        this.constraints.forEach((obj) => {
            let path:Paper.Path.Line = obj.path;
            let constraint = obj.constraint;
            path.segments[0].point.set(constraint.bodyA.position.x, constraint.bodyA.position.y);
            path.segments[1].point.set(constraint.bodyB.position.x, constraint.bodyB.position.y);
        })


        window.requestAnimationFrame(this.render.bind(this));
    }




}
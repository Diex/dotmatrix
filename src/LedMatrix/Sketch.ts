
export class Sketch {
    objects: any[] = [];
    constraints: any[] = [];

    
    constructor(canvas: HTMLCanvasElement) {
        console.log("Sketch constructor");
        this.objects = [];
        this.constraints = [];
    }

    lines() {
            // let path = new Paper.Path.Line(
            //     new Paper.Point(constraint.bodyA.position.x, constraint.bodyA.position.y),
            //     new Paper.Point(constraint.bodyB.position.x, constraint.bodyB.position.y));
            // path.strokeColor = 'black';
            // path.strokeWidth = 0.3;
        
    }


    render() {

        this.objects.forEach((obj) => {
            // let particle = obj.particle;
            // let body = obj.body;
            // particle.position = new Paper.Point(body.position.x, body.position.y);
        })

        this.constraints.forEach((obj) => {
            // let path: Paper.Path.Line = obj.path;
            // let constraint = obj.constraint;
            // path.segments[0].point.set(constraint.bodyA.position.x, constraint.bodyA.position.y);
            // path.segments[1].point.set(constraint.bodyB.position.x, constraint.bodyB.position.y);
        })


        window.requestAnimationFrame(this.render.bind(this));
    }
}
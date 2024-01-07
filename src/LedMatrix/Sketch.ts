import { DotMatrix } from "./DotMatrix";

export class Sketch {
    objects: any[] = [];
    constraints: any[] = [];

    dotmatrix: DotMatrix;
    canvas: HTMLCanvasElement;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        console.log("Sketch constructor");
        this.objects = [];
        this.constraints = [];

        this.dotmatrix = new DotMatrix(8, 8);
        this.render();
    }



    render() {

        this.dotmatrix.render(this.canvas);
        
        window.requestAnimationFrame(this.render.bind(this));
    }
}
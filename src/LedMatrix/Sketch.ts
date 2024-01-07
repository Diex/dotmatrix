import { DotMatrix } from "./DotMatrix";



export class Sketch {
    
    dotmatrix: DotMatrix;
    canvas: HTMLCanvasElement;
    
    constructor(canvas: HTMLCanvasElement) {
        console.log("Sketch constructor");
    
        this.canvas = canvas;        
        this.dotmatrix = new DotMatrix(8, 8);
        this.dotmatrix.setLocation(100, 100);
        this.render();

        for (let i = 0; i < 8; i++) {
            this.dotmatrix.setRowByte(i, 0);
        }    
    }
    


    render() {
        this.dotmatrix.randomize();
        this.dotmatrix.render(this.canvas);        
        window.requestAnimationFrame(this.render.bind(this));
    }
}
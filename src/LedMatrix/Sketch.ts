import { DotMatrix } from "./DotMatrix";



export class Sketch {
    
    dotmatrix: DotMatrix[];
    canvas: HTMLCanvasElement;
    
    constructor(canvas: HTMLCanvasElement) {
        console.log("Sketch constructor");

        this.dotmatrix = [];

        let centerx = canvas.width/2;
        let centery = canvas.height/2;
        let panelswidth = 3*8*15;
        let panelsheight = 7*8*15;
        let startx = centerx - panelswidth/2;
        let starty = centery - panelsheight/2;

        this.canvas = canvas;        
        for(let x = 0; x < 3; x++){
            for(let y = 0; y < 7; y++){
                this.dotmatrix[y*3+x] = new DotMatrix(8, 8);
                this.dotmatrix[y*3+x].setLocation(startx + x*8*15, starty + y*8*15);
            }            
        }
        

        
        this.render();

        for (let i = 0; i < 8; i++) {
            // this.dotmatrix.setRowByte(i, 0);
        }    
    }
    


    render() {

        for(let x = 0; x < 3; x++){
            for(let y = 0; y < 7; y++){
                this.dotmatrix[y*3+x].randomize();
                this.dotmatrix[y*3+x].render(this.canvas);        
            }            
        }
       
        setTimeout(window.requestAnimationFrame,16, this.render.bind(this));
    }
}
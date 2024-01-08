import { DotMatrix } from "./DotMatrix";
import { Bytebeat } from "./../Bytebeat/Bytebeat";

import * as paper from "paper";

export class Sketch {
    
    dotmatrix: DotMatrix[];
    canvas: HTMLCanvasElement;
    bb:Bytebeat;
    group: paper.Group;
    numrows: number = 5; // Add numrows property

    constructor(canvas: HTMLCanvasElement, inputSlider: HTMLInputElement) {
        console.log("Sketch constructor");

        this.bb = new Bytebeat();
        this.dotmatrix = [];
        // inputSlider.onchange = () => {
        //     this.numrows = parseInt(inputSlider.value);
        //     this.group.removeChildren();
        //     this.dotmatrix = [];
        //     // this.setup(canvas, inputSlider);
        // }
        

        let centerx = canvas.width/2;
        let centery = canvas.height/2;
        let panelswidth = 3*8*15;
        let panelsheight = this.numrows*8*15; // Use numrows property
        let startx = centerx - panelswidth/2;
        let starty = centery - panelsheight/2;

        this.canvas = canvas;        

        this.group = new paper.Group();

        for(let x = 0; x < 3; x++){
            for(let y = 0; y < this.numrows; y++){ // Use numrows property
                this.dotmatrix[y*3+x] = new DotMatrix(8, 8);
                this.dotmatrix[y*3+x].setLocation(startx + x*8*15, starty + y*8*15);
                this.dotmatrix[y*3+x].enable(Math.random() < 0.5 ? true : false);
                this.group.addChild(this.dotmatrix[y*3+x].group);
            }            
        }
        
        this.group.rotate(90);
        this.render();   
    }
    
    iteration = Math.random()*333E5;

    render() {

        
        // The purpose of these operations isn't clear from the code alone, but they seem to be generating some kind of value based on the input parameters. The exact nature of the value would depend on the specific values of ut and form.
        for(let x = 0; x < 3; x++){
            for(let y = 0; y < this.numrows; y++){                
                for(let i = 0; i < 8; i++){
                        let val = this.bb.generate(y*3+x+this.iteration+i, y);
                        this.dotmatrix[y*3+x].setRowByte(i, val);
                }

                this.dotmatrix[y*3+x].render(this.canvas);        
            }            
        }

        this.iteration++;
       
        setTimeout(window.requestAnimationFrame,60, this.render.bind(this));
    }
}
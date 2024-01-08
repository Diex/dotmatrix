import { Bytebeat } from "./../Bytebeat/Bytebeat";
import { DotMatrix } from "./../LedMatrix/DotMatrix";
import * as paper from "paper";

export class Sketch {

numrows: number = 4; // Add numrows property
numcolumns: number = 8; // Add numcolumns property
dotMatrixArray: DotMatrix[][] = [];
canvas;
constructor(canvas: HTMLCanvasElement,) {
    
    this.canvas = canvas;

    for (let i = 0; i < this.numcolumns; i++) {
        const row: DotMatrix[] = [];
        for (let j = 0; j < this.numrows; j++) {
            let dm = new DotMatrix(8, 8);
            dm.setSize(120);
            // dm.setLocation(i * 120, j*120); // Set the location of each DotMatrix
            dm.randomize();
            row.push(dm);
        }
        this.dotMatrixArray.push(row);
    }



}




render() {

        
    // The purpose of these operations isn't clear from the code alone, but they seem to be generating some kind of value based on the input parameters. The exact nature of the value would depend on the specific values of ut and form.
    for(let x = 0; x < this.numcolumns; x++){
        for(let y = 0; y < this.numrows; y++){                
            this.dotMatrixArray[x][y].render(this.canvas);        
        }            
    }


   
    setTimeout(window.requestAnimationFrame,60, this.render.bind(this));
}
}
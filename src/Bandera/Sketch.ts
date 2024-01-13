import { Bytebeat } from "./../Bytebeat/Bytebeat";
import { DotMatrix } from "./../LedMatrix/DotMatrix";
import * as paper from "paper";

export class Sketch {

    numrows: number = 2; // Add numrows property
    numcolumns: number = 16; // Add numcolumns property
    dotMatrixArray: DotMatrix[][] = [];
    canvas:any;
    private bb: Bytebeat = new Bytebeat();
    private group: paper.Group = new paper.Group();

    constructor(canvas: HTMLCanvasElement,) {

        this.canvas = canvas;
        let size = 100;
        let groupWidth = this.numcolumns * size;
        let groupHeight = this.numrows * size;
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        let offsetX = (canvasWidth - groupWidth) / 2;
        let offsetY = (canvasHeight - groupHeight) / 2;

        for (let i = 0; i < this.numcolumns; i++) {
            const row: DotMatrix[] = [];
            for (let j = 0; j < this.numrows; j++) {
                let dm = new DotMatrix(8, 12);
                dm.setSize(size);
                dm.setLocation(i * size + offsetX, j * size + offsetY); // Set the location of each DotMatrix with offset
                dm.randomize();

                this.group.addChild(dm.group);
                row.push(dm);
            }
            this.dotMatrixArray.push(row);
        }
    }



    iteration = Math.random() * 333E5;
    render() {
        this.iteration++;

        for (let x = 0; x < this.numcolumns; x++) {
            for (let y = 0; y < 1; y++) {
                for (let i = 0; i < 8; i++) {
                    let val = this.bb.generate(y * 3 + x*8 + this.iteration + i, y);
                    // let val = this.pattern[y][x * 8 + i];
                    this.dotMatrixArray[x][y].setColumnByte(i, val);
                    this.dotMatrixArray[x][y + 1].setColumnByte(i, this.reverseBitOrder(val));
                }
            }
        }

        for (let x = 0; x < this.numcolumns; x++) {
            for (let y = 0; y < this.numrows; y++) {
                this.dotMatrixArray[x][y].render(this.canvas);
            }
        }

        setTimeout(window.requestAnimationFrame, 60, this.render.bind(this));
    }
    
    invertBits(val: number): number {
        return ~val;
    }


   
reverseBitOrder(val: number): number {
    let result = 0;
    for (let i = 0; i < 8; i++) {
        result <<= 1;
        result |= (val & 1);
        val >>= 1;
    }
    return result;
    }
}
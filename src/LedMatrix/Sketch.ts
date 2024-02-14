import { DotMatrix } from "./DotMatrix";
import { Bytebeat } from "./../Bytebeat/Bytebeat";

import * as paper from "paper";

export class Sketch {
    
    canvas: HTMLCanvasElement;
    panels: DotMatrix[];    
    bb:Bytebeat;
    
    group: paper.Group;
    
    numcols: number = 1; // Add numcolumns property
    numrows: number = 1; // Add numrows property
    


    // dotMatrixPanel: DotMatrix = new DotMatrix(10);

    constructor(canvas: HTMLCanvasElement, inputSlider: HTMLInputElement) {

        console.log("Sketch constructor");
        this.canvas = canvas;
        this.bb = new Bytebeat();
        this.panels = [];


        let centerx = canvas.width/2;
        let centery = canvas.height/2;
        
        let panelSize = 400; 
                

        this.group = new paper.Group();
        
        console.log('canvaswidth', canvas.width);
        console.log('panelsize', panelSize);

        // for(let column = 0; column < this.numcols; column++){
        //     for(let row = 0; row < this.numrows; row++){ // Use numrows property
                
        //         let panel = new DotMatrix(panelSize);
                
        //         panel.setLocation(
        //            300+  column * panel.group.bounds.width , 
        //             300 + row * panel.group.bounds.height);
                
        //             // panel.setLocation(0,0);
                
        //             // console.log('panel', panel.group.position);
        //         // panel.enable(Math.random() < 0.5 ? true : false);         
        //         panel.enable(false);       
        //         this.group.addChild(panel.group);

        //         this.panels[row*this.numcols+column] = panel;
                
        //         panel.group.bounds.selected = true;
                
                
        //     }            
        // }
        
        this.panels[0] = new DotMatrix(panelSize);
        this.panels[0].setLocation(300,300);
        this.panels[0].group.bounds.selected = true;
        // this.group.rotate(90);
        
        this.render();   
    }
    
    iteration = Math.random()*333E5;

    render() {

        // test
        // const center = new paper.Point(this.canvas.width / 2, this.canvas.height / 2);
        // const width = this.canvas.width / 2;
        // const height = this.canvas.height / 2;
        // const rectangle = new paper.Rectangle(  center.subtract(center.divide(2)) , new paper.Size(width, height));
        // const path = new paper.Path.Rectangle(rectangle);
        // path.fillColor = 'red';
        // this.group.addChild(path);

        // this.dotMatrixPanel.randomize();
        // this.dotMatrixPanel.render(this.canvas);

        // // The purpose of these operations isn't clear from the code alone, but they seem to be generating some kind of value based on the input parameters. The exact nature of the value would depend on the specific values of ut and form.
        for(let x = 0; x < this.numcols; x++){
            for(let y = 0; y < this.numrows; y++){                
                
                for(let i = 0; i < 8; i++){
                        let val = this.bb.generate(y*3+x+this.iteration+i, 2);                        
                        this.panels[y*this.numcols+x].setColumnByte(i, val);
                        if(!this.panels[y*this.numcols+x].on) this.panels[y*this.numcols+x].clear();
                }

                this.panels[y*this.numcols+x].render(this.canvas);        
                
            }            
        }

        this.iteration++;
       
        setTimeout(window.requestAnimationFrame,60, this.render.bind(this));
    }
}
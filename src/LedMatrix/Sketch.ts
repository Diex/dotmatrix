import { DotMatrix } from "./DotMatrix";
import { Bytebeat } from "./../Bytebeat/Bytebeat";

import * as paper from "paper";

export class Sketch {

    canvas: HTMLCanvasElement;
    panels: DotMatrix[];
    bb: Bytebeat;

    matrix: paper.Group;

    numcols: number = 3; // Add numcolumns property
    numrows: number = 16; // Add numrows property

    whiteDots: paper.Item[] = [];

    constructor(canvas: HTMLCanvasElement, inputSlider: HTMLInputElement) {

        console.log("Sketch constructor");
        this.canvas = canvas;
        paper.view.scaling = new paper.Point(4,4);
        paper.view.rotate(90);
        
        this.bb = new Bytebeat();

        this.panels = [];

        let centerx = canvas.width / 2;
        let centery = canvas.height / 2;

        // let panelSize = canvas.height / this.numrows;
        let panelSize = 32; // mm

        this.matrix = new paper.Group();

        console.log('canvaswidth', canvas.width);
        console.log('panelsize', panelSize);

        for (let column = 0; column < this.numcols; column++) {
            for (let row = 0; row < this.numrows; row++) { // Use numrows property

                let panel = new DotMatrix(panelSize);

                panel.setLocation(
                    column * panel.dim.width,
                    row * panel.dim.height);
                
                panel.enable(Math.random() < 0.2 ? true : false);
                // panel.enable(false);       
                this.matrix.addChild(panel.drawable);

                this.panels[row * this.numcols + column] = panel;

                // panel.drawable.bounds.selected = true;


            }
        }

        this.matrix.position.x = centerx;
        this.matrix.position.y = centery;

        this.render();

        setInterval(this.resetMatrix.bind(this), 10000);

        console.log(
            
        );

    }

  
    resetMatrix(){
        for (let column = 0; column < this.numcols; column++) {
            for (let row = 0; row < this.numrows; row++) { // Use numrows property
                this.panels[row * this.numcols + column]
                    .enable(Math.random() < 0.5 ? true : false);
            }
        }
    }

    stashWhiteDots(parent:paper.Group, dots: paper.Item[]){
        dots.forEach(dot => {
            if(!dot.data.status) {            
              this.whiteDots.push(dot);
              dot.remove();
            }
        });
    }

    applyWhiteDots(parent:paper.Group, dots: paper.Item[]){
        dots.forEach(dot => {
            parent.addChild(dot);
        });
    }


    hideDots(dots: paper.Item[]) {
        dots.forEach(dot => {
            dot.visible  = dot.data.status;    
        });
    }

    showDots(dots: paper.Item[]) {
        dots.forEach(dot => {
            dot.visible  = true; 
        });
    }

    getDotsFromMatrix(item: paper.Item) {
        
        return item.children;
    }
    getMatrixElements() {
        return paper.project.layers[0].children[0].children;
    }

    iteration = Math.random() * 333E5;

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
        
        for (let x = 0; x < this.numcols; x++) {
            for (let y = 0; y < this.numrows; y++) {

                for (let i = 0; i < 8; i++) {                    
                    let val = this.bb.generate(y * 3 + x + this.iteration + i, x * this.numrows + y);
                    this.panels[y * this.numcols + x].setColumnByte(i, val);                    
                }

                if (!this.panels[y * this.numcols + x].on) this.panels[y * this.numcols + x].clear();                
                this.panels[y * this.numcols + x].render(this.canvas);
            }
        }
        
        this.iteration++;
        setTimeout(window.requestAnimationFrame, 1./8*1000, this.render.bind(this));
    }

    download(){
        console.log("download");
        var fileName = "custom.svg";
        var scaling = paper.view.scaling;
        paper.view.scaling = new paper.Point(72 / 25.4, 72 / 25.4);  
        
        

        for (let i = 0; i < this.getMatrixElements().length; i++) {
            // console.log(this.getMatrixElements()[i]);
            this.hideDots(this.getDotsFromMatrix(this.getMatrixElements()[i]));
        }
      



        var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({ asString: true }) as unknown as string);        
        var link = document.createElement("a");
        link.download = fileName;
        link.href = url;
        link.click();
        paper.view.scaling = scaling;

        for (let i = 0; i < this.getMatrixElements().length; i++) {
            // console.log(this.getMatrixElements()[i]);
            this.showDots(this.getDotsFromMatrix(this.getMatrixElements()[i]));
        }
    
    }
}
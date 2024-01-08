import * as paper from "paper";

export class DotMatrix {
    private rows: number;
    private columns: number;
    
    private matrix: boolean[][];

    private dots: paper.Path.Circle[][];
    private dotSize:number; // Size of each dot
    private dotSpacing:number; // Spacing between dots
    // public size: paper.Size;
    private next:DotMatrix;
    private on = true;
    group: paper.Group;

    constructor(rows: number, columns: number) {
    
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];
        this.dots = [];
        this.group = new paper.Group();
        
    
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            this.dots[i] = [];
            
            for (let j = 0; j < columns; j++) {
            
                this.matrix[i][j] = false;
                this.dots[i][j] = new paper.Path.Rectangle(new paper.Point(0, 0), new paper.Size(1));
                
                this.group.addChild(this.dots[i][j]);

            }
        }

        
    }

    resizeDimensions(elem:paper.Path,width:number,height:number){
        //calc scale coefficients and store current position
        var scaleX = width/elem.bounds.width;
        var scaleY = height/elem.bounds.height;
        var prevPos = new paper.Point(elem.bounds.x,elem.bounds.y);
    
        //apply calc scaling
        elem.scale(scaleX,scaleY);
    
        //reposition the elem to previous pos(scaling moves the elem so we reset it's position);
        var newPos = prevPos.add(new paper.Point(elem.bounds.width/2,elem.bounds.height/2));
        elem.position = newPos;
    }
    

    connectTo(next: DotMatrix) {
        this.next = next;
    }

    setSize(width: number) {
        this.dotSpacing = width / 8;
        this.dotSize = this.dotSpacing * 0.8;        

        for (let row = 0; row < this.rows; row++) {
            const dotY = row * this.dotSpacing + this.dotSpacing / 2;
            for (let column = 0; column < this.columns; column++) {                
                // // Draw a circular dot
                const dot = this.dots[row][column];             
                this.resizeDimensions(dot,this.dotSize,this.dotSize);
                const dotX = column * this.dotSpacing + this.dotSpacing / 2;               
                this.dots[row][column].position.x = dotX;
                this.dots[row][column].position.y = dotY;
            }
        }
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[i][j] = Math.random() < 0.5;
            }
        }
    }

    setLocation(x: number,y: number){
        this.group.position.x = x;
        this.group.position.y = y;
    }


    setDot(row: number, column: number, value: boolean) {
        if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) {
            this.matrix[row][column] = value;
        }
    }

    getDot(row: number, column: number): boolean {
        if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) {
            return this.matrix[row][column];
        }
        return false;
    }

    clear() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[i][j] = false;
            }
        }
    }

    enable(on: boolean) {
        this.on = on;
    }

    setRow(row: number, data: boolean[]) {
        if (row >= 0 && row < this.rows && data.length === this.columns) {
            this.matrix[row] = data;
        }
    }


    setRowByte(row: number, data: number) {
        if (row >= 0 && row < this.rows) {
            for (let i = 0; i < this.columns; i++) {
                this.matrix[row][i] = this.getBit(data, i);
            }
        }
     
    }
    
    getBit(number: number, position: number): boolean {
        return (number >> position) & 1 ? true : false;
    }

    render(canvas:any) {

        if(!this.on) return;
        
        // Loop through each dot in the matrix
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {                
                // // Draw a circular dot
                const dot = this.dots[row][column];             
                dot.fillColor = this.matrix[row][column] ? 'red' : 'black';
                dot.strokeColor = 'black';
                dot.strokeWidth = 0;
            }
        }
    }
}

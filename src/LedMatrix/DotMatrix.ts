import * as paper from "paper";

export class DotMatrix {
    private rows: number = 8;
    private columns: number = 8;    
    
    private matrix: boolean[][];
    private el: paper.Path[][];
    
    private elSize:number; // Size of each dot
    
    // private elSpacing:number; // Spacing between dots
    
    public on = true;
    group: paper.Group;
    public dim: paper.Size;
    private gap = 0.9;
    constructor(size: number = 10) {

        this.elSize = size/this.columns;
        this.matrix = [];
        this.el = [];
        this.group = new paper.Group();
        
        // console.log("DotMatrix constructor");

        for (let column = 0; column < this.rows; column++) {
            
            this.matrix[column] = [];
            this.el[column] = [];
            
            for (let row = 0; row < this.columns; row++) {
            
                this.matrix[column][row] = false;
                this.el[column][row] = new paper.Path.Rectangle(new paper.Point(0, 0), new paper.Size(this.elSize*this.gap, this.elSize*this.gap));      
                this.el[column][row].position.x = column*this.elSize;
                this.el[column][row].position.y = row*this.elSize;
                this.group.addChild(this.el[column][row]);     
                           
                // console.log(this.el[column][row].position.x);   


            }
        }


        const scale = 0.97;
        // this.group.scale(scale);

        // this.dim = new paper.Size(this.elSize*this.rows ,this.elSize*this.columns );
        this.dim = new paper.Size(this.group.bounds.width ,this.group.bounds.height );
        // console.log('dim', this.dim);
        
        
    }



    // setSize(width: number) {

    //     this.elSpacing = width / 8;
    //     this.elSize = this.elSpacing * 0.3;        

    //     for (let row = 0; row < this.rows; row++) {
    //         const dotY = row * this.elSpacing + this.elSpacing / 2;
    //         for (let column = 0; column < this.columns; column++) {                
    //             // // Draw a circular dot
    //             const dot = this.el[row][column];             
    //             // this.resizeDimensions(dot,this.elSize,this.elSize);
    //             const dotX = column * this.elSpacing + this.elSpacing / 2;               
    //             this.el[row][column].position.x = dotX;
    //             this.el[row][column].position.y = dotY;
    //         }
    //     }
    // }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[i][j] = Math.random() < 0.5;
            }
        }

        // console.table(this.matrix);
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

    setColumnByte(column: number, data: number) {
        if (column >= 0 && column < this.columns) {
            for (let i = 0; i < this.rows; i++) {
                this.matrix[i][column] = this.getBit(data, i);
            }
        }
    }
    
    getBit(number: number, position: number): boolean {
        return (number >> position) & 1 ? true : false;
    }

    render(canvas:any) {

        
        
        // Loop through each dot in the matrix
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {                
                const dot = this.el[row][column];             
                dot.fillColor = this.matrix[row][column] ? 'red' : 'black';
                // dot.strokeColor = 'black';
                dot.strokeWidth = 0;
            }
        }
    }



}

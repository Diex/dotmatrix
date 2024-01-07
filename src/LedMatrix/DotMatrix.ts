import * as paper from "paper";

export class DotMatrix {
    private rows: number;
    private columns: number;
    
    private matrix: boolean[][];

    private dots: paper.Path.Circle[][];
    private dotSize = 10; // Size of each dot
    private dotSpacing = 15; // Spacing between dots
    private next:DotMatrix;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];
        this.dots = [];

        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            this.dots[i] = [];
            const dotY = i * this.dotSpacing + this.dotSpacing / 2;

            for (let j = 0; j < columns; j++) {
                this.matrix[i][j] = false;
                this.dots[i][j] = new paper.Path.Circle(new paper.Point(0, 0), this.dotSize / 2);
                const dotX = j * this.dotSpacing + this.dotSpacing / 2;
                
                this.dots[i][j].position.x = dotX;
                this.dots[i][j].position.y = dotY;
            }
        }

        this.randomize();

        console.log(this.matrix);
    }

    connectTo(next: DotMatrix) {
        this.next = next;
    }


    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[i][j] = Math.random() < 0.5;
            }
        }
    }

    setLocation(x: number,y: number){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {                
                this.dots[i][j].position.x += x;
                this.dots[i][j].position.y += y;
            }
        }
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

        
        // Loop through each dot in the matrix
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                
                // // Draw a circular dot
                const dot = this.dots[row][column];

             
                dot.fillColor = this.matrix[row][column] ? 'white' : 'black';
                dot.strokeColor = 'black';
                dot.strokeWidth = 0;

            }
        }
    }
}

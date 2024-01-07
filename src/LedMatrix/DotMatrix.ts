import * as paper from "paper";

export class DotMatrix {
    private rows: number;
    private columns: number;
    private matrix: boolean[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];

        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < columns; j++) {
                this.matrix[i][j] = false;
            }
        }

        this.randomize();

        console.log(this.matrix);
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.matrix[i][j] = Math.random() < 0.5;
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

    render(canvas:any) {
        const dotSize = 10; // Size of each dot
        const dotSpacing = 15; // Spacing between dots

        
        // Loop through each dot in the matrix
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const dotX = column * dotSpacing + dotSpacing / 2;
                const dotY = row * dotSpacing + dotSpacing / 2;

                // Draw a circular dot
                const dot = new paper.Path.Circle(new paper.Point(dotX, dotY), dotSize / 2);
                dot.fillColor = this.matrix[row][column] ? 'black' : 'white';
                dot.strokeColor = 'black';
                dot.strokeWidth = 1;

                // Add the dot to the canvas
                // canvas.addChild(dot);
            }
        }
    }
}

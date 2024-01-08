import * as Paper from "paper";
import {Sketch as clothgen} from "./ClothGen/Sketch";
import {Sketch as ledmatrix} from "./LedMatrix/Sketch";
import {Sketch as bandera} from "./Bandera/Sketch";

const paths: any[] = [];

window.onload = () => {
    
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('content');
    if (!canvas) {
        throw new Error('Could not find canvas named content in document!');
        // see: templates/index.handlebars
    }
    Paper.setup(canvas);
    
    // document.getElementById("download-to-svg").onclick = download;
    
    // let sketch = new clothgen(canvas);
    // let sketch = new ledmatrix(canvas, document.getElementById("numrows") as HTMLInputElement);
    let sketch = new bandera(canvas);
    sketch.render();

    window['paper'] = Paper;
};



function download() {
    console.log("download");
    var fileName = "custom.svg";
    var scaling = Paper.view.scaling;
    Paper.view.scaling = new Paper.Point(72 / 25.4, 72 / 25.4);    
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(Paper.project.exportSVG({ asString: true }) as unknown as string);
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
    Paper.view.scaling = scaling;


}
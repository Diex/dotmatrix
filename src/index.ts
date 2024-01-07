import * as Paper from "paper";
import {Sketch} from "./Sketch";


const paths: any[] = [];
window.onload = () => {
    
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('content');
    // const gl = canvas.getContext("webgl");
    if (!canvas) {
        throw new Error('Could not find canvas named content in document!');
    }

    document.getElementById("download-to-svg").onclick = download;
    Paper.setup(canvas);

    let sketch = new Sketch(canvas);
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
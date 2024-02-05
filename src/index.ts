import * as Paper from "paper";
import {Sketch as clothgen} from "./ClothGen/Sketch";
import {Sketch as ledmatrix} from "./LedMatrix/Sketch";
import {Sketch as bandera} from "./Bandera/Sketch";
import { count } from "console";

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
  let sketch = new ledmatrix(canvas, document.getElementById("numrows") as HTMLInputElement);
  // let sketch = new bandera(canvas);
  sketch.render();
  window['paper'] = Paper;

  const div = document.querySelector("div");

  const counter = document.createElement("div");
  counter.id = "counter"
  div.appendChild(counter);
  
  const startRecordingButton = document.createElement("button");
  startRecordingButton.innerText = "Start Recording";
  startRecordingButton.onclick = () => startRecording(canvas, counter);
  div.appendChild(startRecordingButton);

  const stopRecordingButton = document.createElement("button");
  stopRecordingButton.innerText = "Stop Recording";
  stopRecordingButton.onclick = () => stopRecording();
  div.appendChild(stopRecordingButton);


 
};

let startTime: number;
let timerId:any;


function updateCounter(counter: HTMLDivElement) {  
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  counter.innerText = `Elapsed Time: ${elapsedTime} seconds`;
  counter.style.color = "white"; // Set text color to white
}



function stopRecording() {
  // Add code to stop recording here
  clearInterval(timerId);

  mediaRecorder.stop();
}



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

var mediaRecorder:any;


function startRecording (canvas: HTMLCanvasElement, counter: HTMLDivElement) {
    startTime = Date.now();
    timerId = setInterval(updateCounter, 1000, counter);

    const data: BlobPart[] = []; // here we will store our recorded media chunks (Blobs)
    const stream = canvas.captureStream(30); // records the canvas in real time at our preferred framerate 30 in this case.
    mediaRecorder = new MediaRecorder(stream); // init the recorder
    // whenever the recorder has new data, we will store it in our array
    mediaRecorder.ondataavailable = (e:any) => data.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    mediaRecorder.onstop = (e:any) =>
      downloadVideo(new Blob(data, { type: "video/mp4" }));
    mediaRecorder.start();
    // setTimeout(() => {
    //   console.log("stop recording");
    //   mediaRecorder.stop();
    // }, 6000); // stop recording in 6s
  };
  
  const downloadVideo = async (blob: Blob | MediaSource) => {
    const div = document.querySelector("div");
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "test.mp4";
    a.className = "button";
    a.innerText = "click here to download";
    div.appendChild(a);
  };
  
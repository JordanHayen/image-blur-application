<h1>Image Blur Application</h1>
<h2>Introduction</h2>
<p>The purpose of this application is to blur faces in an image.</p>
<p>This will be done through a web application that will allow the user to do the following:</p>

<img src="/static/blur example.png">

<h2>Requirements</h2>
<p>The project needed to be a web application that supported the following functional requirements:</p>
<ul>
  <li>Allow the user to submit an image from their file system</li>
  <li>Detect all faces within the image</li>
  <li>Blur all deteted faces</li>
  <li>Allow the user to download the result image</li>
</ul>

<p>In addition, the application needed to have a fast response time.</p>
<p>The application should take no more than two seconds for the image to be blurred after the user has clicked the blur button.</p>
<p>In order to keep track of response time, logging standards should be followed.</p>

<h2>Technologies</h2>
<p>In order to support the above requirements, several technologies were used.</p>
<p>These include the following:</p>
<table>
  <tr>
    <th>Technology</th>
    <th>Version</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td>TypeScript</td>
    <td>4.1.5</td>
    <td>Web Application Development</td>
  </tr>
  <tr>
    <td>Node.js</td>
    <td>18.13.0</td>
    <td>Javascript server runtime</td>
  </tr>
  <tr>
    <td>SvelteKit</td>
    <td>1.25.1</td>
    <td>Web Application Development</td>
  </tr>
  <tr>
    <td>TensorFlowJS</td>
    <td>2.11.0</td>
    <td>Runtime for Media Pipe Face Detection</td>
  </tr>
  <tr>
    <td>Media Pipe Face Detection</td>
    <td>1.0.2</td>
    <td>Facial recognition</td>
  </tr>
  <tr>
    <td>Git</td>
    <td>2.38.0</td>
    <td>Version control</td>
  </tr>
  <tr>
    <td>GitHub</td>
    <td></td>
    <td>Version control, continuous delivery</td>
  </tr>
  <tr>
    <td>Heroku</td>
    <td></td>
    <td>Web application hosting, continuous delivery</td>
  </tr>
  <tr>
    <td>SolarWinds Loggly</td>
    <td></td>
    <td>Log aggregation</td>
  </tr>
  <tr>
    <td>UpTime Robot</td>
    <td></td>
    <td>Web application monitoring</td>
  </tr>
</table>
<p>I selected NodeJS, TypeScript, and SvelteKit for the web application because they are all technologies which I enjoy using.</p>
<p>I had initially intended to train Mask RCNN on a custom dataset for the face detector, but I ended up choosing Media Pipe because my implementation of MASK RCNN was not consistent enough.</p>
<p>I chose Heroku for deployment because it can be easily integrated with GitHub for continuous delivery and Loggly for log aggregation.</p>

<h2>Technical Approach</h2>
<p>This flowchart shows how the user will interact with the application at a high level:</p>
<img src="static/senior project flowchart 1.png">
<p>The submitted image is processed with a face detector created using the Media Pipe Face Detector. This generates a bounding box for every face detected within the image. These bounding boxes are passed to the blur module</p>
<p>The blur effect works thusly:</p>
<ol>
  <li>Divide the bounding box into a grid of equally sized squares</li>
  <li>Select the pixel at the center of each square</li>
  <li>Set every pixel within the square to be the same color as that pixel</li>
</ol>
<p>The following is a low fidelity wireframe that I developed for this application's user interface:</p>
<img src="static/low fidelity wireframe.png">
<p>Since the application only has two screens the user interface is very simple.</p>

<h2>Challenges</h2>
<p>As stated previously, I was unable to use Mask RCNN as I had originally intended. I solved this by using Media Pipe instead.</p>
<p>When I first designed this project I planned to use a convolutional blur algorithm to obscure the faces. This ended up not performing well and not obscuring the faces completely. This was solved by switching to a pixelation effect which completely obscures the faces and runs much faster.</p>

<h2>Outstanding Issues</h2>
<p>There are currently no outstanding issues.</p>

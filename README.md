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

<p>In addition, the application needed to have a fast response time</p>
<p>The application should take no more than two seconds for the image to be blurred after the user has clicked the blur button</p>
<p>In order to keep track of response time, logging standards should be followed</p>

<h2>Technologies</h2>
<p>In order to support the above requirements, several technologies were used</p>
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
<p>I selected NodeJS, TypeScript, and SvelteKit for the web application because they are all technologies which I enjoy using</p>
<p>I had initially intended to train Mask RCNN on a custom dataset for the face detector, but I ended up choosing Media Pipe because my implementation of MASK RCNN was not consistent enough</p>
<p>I chose Heroku for deployment because it can be easily integrated with GitHub for continuous delivery and Loggly for log aggregation</p>

<h2>Technical Approach</h2>


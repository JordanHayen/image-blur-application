import * as tf from "@tensorflow/tfjs"
import * as faceDetection from "@tensorflow-models/face-detection"

// The model is created using TensorFlows face detection model
const model = faceDetection.SupportedModels.MediaPipeFaceDetector;

// A configuration object is created for the face detector is created
// The model needs to have a TensorFlowJS runtime
// The model type is set to full, meaning that it is capable of detecting faces as far as five meters away from the camera
// The model is configured to detect up to fifty faces
const detectorConfig: faceDetection.MediaPipeFaceDetectorTfjsModelConfig = {
  runtime: "tfjs",
  modelType: "full",
  maxFaces: 50
}

// The face detector is created using the model and the configuration object
const detector = await faceDetection.createDetector(model, detectorConfig);
export default detector;
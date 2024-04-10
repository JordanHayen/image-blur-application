import * as tf from "@tensorflow/tfjs"
import * as faceDetection from "@tensorflow-models/face-detection"

// The model is created using TensorFlows face detection model
const model = faceDetection.SupportedModels.MediaPipeFaceDetector;

// A configuration object is created for the face detector is created
const detectorConfig: faceDetection.MediaPipeFaceDetectorTfjsModelConfig = {
  runtime: "tfjs",    // The model needs to have a TensorFlowJS runtime
  modelType: "full",  // The model type is set to full, meaning that it is capable of detecting faces as far as five meters away from the camera
  maxFaces: 50,       // The model is configured to detect up to fifty faces
  detectorModelUrl: "https://www.kaggle.com/models/mediapipe/face-detection/frameworks/tfJs/variations/full/versions/1/model.json?tfjs-format=file&tfhub-redirect=true' (redirected from 'https://tfhub.dev/mediapipe/tfjs-model/face_detection/full/1/model.json?tfjs-format=file') from origin 'http://localhost:5173"
}

// The face detector is created using the model and the configuration object
const detector = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, { runtime: "tfjs", modelType: "full", maxFaces: 50 });
export default detector;
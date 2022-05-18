import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from '@tensorflow/tfjs';
import * as params from './params';
import {CLASS_NO, POINTS} from "./consts";

const COLOR_PALETTE = [
    '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
    '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
    '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
];

export class AICamera {
    constructor(canvasRef, userMediaConfig, poseDetectionModel, detectorConfig) {
        this.canvas = canvasRef.current;
        this.userMediaConfig = userMediaConfig
        this.poseDetectionModel = poseDetectionModel
        this.detectorConfig = detectorConfig
        this.color = 'White';
    }

    initCanvas() {
        const videoWidth = this.video.videoWidth;
        const videoHeight = this.video.videoHeight;
        // Must set below two lines, otherwise video element doesn't show.
        this.canvas.width = videoWidth;
        this.canvas.height = videoHeight;

        // Because the image from camera is mirrored, need to flip horizontally.
        this.ctx = this.canvas.getContext('2d');
        this.ctx.translate(this.video.videoWidth, 0);
        this.ctx.scale(-1, 1);
    }

    initCamera() {
        this.getMediaStream(this.userMediaConfig)
            .then(mediaStream => {
                this.mediaStream = mediaStream;
                this.buildVideo();
                return Promise.all([this.loadTFDetector(), this.loadMetaData(), this.loadClassifier()]);
            })
            .then(([detector, _, poseClassifier]) => {
                this.detector = detector;
                this.loopPrediction();
                this.poseClassifier = poseClassifier;
                this.loadingCallback?.({isLoading: false, error: null});
            })
            .catch(err => {
                this.loadingCallback?.({isLoading: false, error: err});
            })
    }


    setCallback(callback) {
        this.loadingCallback = callback;
    }

    buildVideo() {
        this.video = document.createElement('video');
        this.video.setAttribute('autoPlay', null);
        this.video.setAttribute('playsInline', null);
        this.video.setAttribute('muted', null);
        this.video.addEventListener('canplay', () => this.video.play())
        this.video.srcObject = this.mediaStream;
    }

    drawCtx() {
        this.ctx.drawImage(
            this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    }

    clearCtx() {
        this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
    }

    loadMetaData() {
        return new Promise((resolve) => this.video
            .addEventListener('loadedmetadata', () => {
                this.initCanvas();
                resolve('loadedMetaData');
            })
        );
    }

    loadTFDetector() {
        return poseDetection
            .createDetector(this.poseDetectionModel, this.detectorConfig)
    }

    loadClassifier() {
        return tf.loadLayersModel('https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json');
    }

    get_center_point(landmarks, left_bodypart, right_bodypart) {
        let left = tf.gather(landmarks, left_bodypart, 1)
        let right = tf.gather(landmarks, right_bodypart, 1)
        return tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
    }

    get_pose_size(landmarks, torso_size_multiplier = 2.5) {
        let hips_center = this.get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        let shoulders_center = this.get_center_point(landmarks, POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
        let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
        let pose_center_new = this.get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        pose_center_new = tf.expandDims(pose_center_new, 1)

        pose_center_new = tf.broadcastTo(pose_center_new,
            [1, 17, 2]
        )
        // return: shape(17,2)
        let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
        let max_dist = tf.max(tf.norm(d, 'euclidean', 0))

        // normalize scale
        let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
        return pose_size
    }

    normalize_pose_landmarks(landmarks) {
        let pose_center = this.get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
        pose_center = tf.expandDims(pose_center, 1)
        pose_center = tf.broadcastTo(pose_center,
            [1, 17, 2]
        )
        landmarks = tf.sub(landmarks, pose_center)

        let pose_size = this.get_pose_size(landmarks)
        landmarks = tf.div(landmarks, pose_size)
        return landmarks
    }

    landmarks_to_embedding(landmarks) {
        // normalize landmarks 2D
        landmarks = this.normalize_pose_landmarks(tf.expandDims(landmarks, 0))
        let embedding = tf.reshape(landmarks, [1, 34])
        return embedding
    }

    detectPose(poses) {
        if (poses[0]) {
            const keypointCoordinates = poses[0].keypoints.map(({x, y}) => [x, y]);
            const processedInput = this.landmarks_to_embedding(keypointCoordinates)
            const classification = this.poseClassifier.predict(processedInput)

            classification.array().then((data) => {
                const classNo = CLASS_NO['Tree']
                // console.log(data[0][classNo])
                if (data[0][classNo] > 0.97) {
                    console.log('DONE')
                    this.color = 'Green';
                } else {
                    this.color = 'White';
                }
            })
        }
    }

    async prediction(detector, video) {
        if (!detector || !video) return;
        try {
            const poses = await detector.estimatePoses(video);
            this.detectPose(poses)
            this.drawResults(poses);
        } catch (error) {
            console.log(error)
            detector.dispose();
            detector = null;
        }
    }

    async loopPrediction() {
        this.drawCtx();
        await this.prediction(this.detector, this.video);
        requestAnimationFrame(this.loopPrediction.bind(this));
    }

    hasMediaDevices() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    }

    getMediaStream(userMediaConfig) {
        return navigator.mediaDevices.getUserMedia(userMediaConfig);
    }

    cleanMediaStream() {
        if (!this.mediaStream) return;
        return this.mediaStream.getTracks().forEach(track => {
            track.stop();
        });
    }


    /**
     * Draw the keypoints and skeleton on the video.
     * @param poses A list of poses to render.
     */
    drawResults(poses) {
        for (const pose of poses) {
            this.drawResult(pose);
        }
    }

    /**
     * Draw the keypoints and skeleton on the video.
     * @param pose A pose with keypoints to render.
     */
    drawResult(pose) {
        if (pose.keypoints != null) {
            this.drawKeypoints(pose.keypoints);
            this.drawSkeleton(pose.keypoints, pose.id);
        }
    }

    /**
     * Draw the keypoints on the video.
     * @param keypoints A list of keypoints.
     */
    drawKeypoints(keypoints) {
        const keypointInd =
            poseDetection.util.getKeypointIndexBySide(this.poseDetectionModel);
        this.ctx.fillStyle = 'Red';
        this.ctx.strokeStyle = "White";
        this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

        for (const i of keypointInd.middle) {
            this.drawKeypoint(keypoints[i]);
        }

        this.ctx.fillStyle = 'Green';
        for (const i of keypointInd.left) {
            this.drawKeypoint(keypoints[i]);
        }

        this.ctx.fillStyle = 'Orange';
        for (const i of keypointInd.right) {
            this.drawKeypoint(keypoints[i]);
        }
    }

    drawKeypoint(keypoint) {
        const score = keypoint.score != null ? keypoint.score : 1;
        const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

        if (score >= scoreThreshold) {
            const circle = new Path2D();
            circle.arc(keypoint.x, keypoint.y, params.DEFAULT_RADIUS, 0, 2 * Math.PI);
            this.ctx.fill(circle);
            this.ctx.stroke(circle);
        }
    }

    /**
     * Draw the skeleton of a body on the video.
     * @param keypoints A list of keypoints.
     */
    drawSkeleton(keypoints, poseId) {
        // Each poseId is mapped to a color in the color palette.
        const color = params.STATE.modelConfig.enableTracking && poseId != null ?
            COLOR_PALETTE[poseId % 20] :
            this.color
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

        poseDetection.util
            .getAdjacentPairs(this.poseDetectionModel)
            .forEach(([i, j]) => {
                const kp1 = keypoints[i];
                const kp2 = keypoints[j];

                // If score is null, just show the keypoint.
                const score1 = kp1.score != null ? kp1.score : 1;
                const score2 = kp2.score != null ? kp2.score : 1;
                const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

                if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(kp1.x, kp1.y);
                    this.ctx.lineTo(kp2.x, kp2.y);
                    this.ctx.stroke();
                }
            });
    }
}
import * as poseDetection from "@tensorflow-models/pose-detection";

export class Camera {
    constructor(canvasRef, userMediaConfig, detectorConfig) {
        this.canvas = canvasRef.current;
        this.userMediaConfig = userMediaConfig
        this.detectorConfig = detectorConfig
        this.isLoading = true;
        this.error = "";
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
                this.buildVideo(mediaStream);
                return Promise.all([this.loadTFDetector(), this.loadMetaData()]);
            })
            .then(([detector]) => {
                this.detector = detector;
                this.loopPrediction();
            })
            .finally(() => {
                this.isLoading = false;
            })
    }

    buildVideo(mediaStream) {
        this.video = document.createElement('video');
        this.video.setAttribute('autoPlay', null);
        this.video.setAttribute('playsInline', null);
        this.video.setAttribute('muted', null);
        this.video.addEventListener('canplay', () => this.video.play())
        this.video.srcObject = mediaStream;
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
            .createDetector(poseDetection.SupportedModels.MoveNet, this.detectorConfig)
    }

    async prediction() {
        if (!this.detector) return;
        try {
            const poses = await this.detector.estimatePoses(this.video);
            console.log(poses)
        } catch (error) {
            console.log(error)
            this.detector.dispose();
            this.detector = null;
        }
    }

    async loopPrediction() {
        this.drawCtx();
        await this.prediction();
        requestAnimationFrame(this.loopPrediction.bind(this));
    }

    hasMediaDevices() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    }

    getMediaStream(requestedMedia) {
        return navigator.mediaDevices.getUserMedia(requestedMedia);
    }

    cleanMediaStream(mediaStream) {
        if (!mediaStream) return;
        return mediaStream.getTracks().forEach(track => {
            track.stop();
        });
    }
}
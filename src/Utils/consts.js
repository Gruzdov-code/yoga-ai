import * as poseDetection from "@tensorflow-models/pose-detection";
import ChairPose from '../Assets/poses/chair.svg';
import CobraPose from '../Assets/poses/cobra.svg';
import DogPose from '../Assets/poses/dog.svg';
import ShoulderPose from '../Assets/poses/shoulder-stand.svg';
import TreePose from '../Assets/poses/tree.svg';
import TrianglePose from '../Assets/poses/triangle.svg';
import WarriorPose from '../Assets/poses/warrior.svg';

export const userMediaConfig = {
    audio: false,
    // video: {facingMode: "environment"},
    video: true
};

export const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
};

export const poseDetectionModel = poseDetection.SupportedModels.MoveNet;

export const poses = [
    {
        label: "Поза стула",
        img: ChairPose,
    },
    {
        label: "Поза кобры",
        img: CobraPose,
    },
    {
        label: "Поза собаки",
        img: DogPose,
    },
    {
        label: "Стойка на плечах",
        img: ShoulderPose,
    },
    {
        label: "Поза дерева",
        img: TreePose,
    },
    {
        label: "Поза треугольника",
        img: TrianglePose,
    },
    {
        label: "Поза война",
        img: WarriorPose,
    }
];

export const POINTS = {
    NOSE: 0,
    LEFT_EYE: 1,
    RIGHT_EYE: 2,
    LEFT_EAR: 3,
    RIGHT_EAR: 4,
    LEFT_SHOULDER: 5,
    RIGHT_SHOULDER: 6,
    LEFT_ELBOW: 7,
    RIGHT_ELBOW: 8,
    LEFT_WRIST: 9,
    RIGHT_WRIST: 10,
    LEFT_HIP: 11,
    RIGHT_HIP: 12,
    LEFT_KNEE: 13,
    RIGHT_KNEE: 14,
    LEFT_ANKLE: 15,
    RIGHT_ANKLE: 16,
}

export const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Traingle: 5,
    Tree: 6,
    Warrior: 7,
}
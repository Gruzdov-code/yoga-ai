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
    duration: "0:50",
    id: 1,
  },
  {
    label: "Поза кобры",
    img: CobraPose,
    duration: "0:30",
    id: 2,
  },
  {
    label: "Поза собаки",
    img: DogPose,
    duration: "0:40",
    id: 3,
  },
  {
    label: "Стойка на плечах",
    img: ShoulderPose,
    duration: "1:00",
    id: 4,
  },
  {
    label: "Поза дерева",
    img: TreePose,
    duration: "1:10",
    id: 5,
  },
  {
    label: "Поза треугольника",
    img: TrianglePose,
    duration: "0:45",
    id: 6,
  },
  {
    label: "Поза война",
    img: WarriorPose,
    duration: "0:35",
    id: 7,
  },
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

export const program = [
  { id: 1,
    label: "Программа 1",
    img: WarriorPose,
    description: "для того",
    poses: poses[1,2,3],
  },
    {
    id: 2,
    label: "Программа 2",
    img: WarriorPose,
    description: "для сего",
    poses: [4,5,6],
  },
    {
    id:3,
    label: "Программа 3",
    img: WarriorPose,
    description: "для 5 10",
    poses: poses[7],
  },
];
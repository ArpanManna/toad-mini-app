import React from "react";
import Lottie from "lottie-react";
import { DiceIcon } from "../assets/svg";
import diceJson from '../assets/lottie/dice';
import bulbJson from '../assets/lottie/animatedBulb';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: diceJson,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}

const Icons = {
    diceIcon: <DiceIcon />,
    animateDice: <Lottie
        {...defaultOptions}
        height={400}
        width={400} />,
    matchPattern: <Lottie
        loop={true}
        autoplay={true}
        animationData={bulbJson}
        height={100}
        width={100} className="h-[100px] w-[100px]" />
}

export default Icons
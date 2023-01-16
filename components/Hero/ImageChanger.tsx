import { FunctionComponent } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";

interface prop {
    image: string
}


const ImageChanger: FunctionComponent<prop> = (props) => {
    const { image } = props
    return (
        <motion.div initial={{opacity: "0%", x: 20}} animate={{opacity: "100%", x: 0}} transition={{duration: 0.8}} exit={{opacity: 0}} className="opacity-0 shadow-imageInset w-full h-full">
            <Image src={image} alt="Phone" className="z-[-1] md:opacity-100 opacity-50 w-full h-auto md:absolute md:top-[4rem] md:bottom-0 md:my-auto object-cover hidden md:block" fill />
        </motion.div>
    );
}

export default ImageChanger;
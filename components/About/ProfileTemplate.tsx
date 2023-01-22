import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { AiOutlineGithub, AiFillInstagram } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'


interface myProp {
    image: string,
    name: string,
    pos: string,
    facebook: string,
    github?: string,
    instagram: string

}

const ProfileTemplate: FunctionComponent<myProp> = (props) => {
    const { image, name, pos, facebook, github, instagram } = props

    const socMed = [
        {
            icon: github !== '' ? <AiOutlineGithub /> : null,
            link: github
        },
        {
            icon: <FaFacebook className="text-[18.5px]" />,
            link: facebook
        },
        {
            icon: <AiFillInstagram />,
            link: instagram
        }
    ]

    return (
        <div className="relative w-[15rem] h-[15rem] 2xl:w-[20rem] 2xl:h-[20rem] group overflow-hidden">
            <Image src={image} alt="Products" width="300" height="300" className="object-cover w-full h-full absolute bottom-0 z-0  group-hover:brightness-50 transition-all ease-in-out duration-300 peer"></Image>

            <div className="z-10 relative w-fit mx-auto text-white text-[22px] flex items-center justify-center mt-4 gap-x-4 translate-y-[-200%] group-hover:translate-y-[0%] transition-all ease-in-out duration-300">
                {socMed.map((items, i) => {
                    return (
                        <a target="_blank" href={items.link} rel="noopener noreferrer" key={i}>
                            <div className="opacity-70 hover:opacity-100 transition-all ease-in-out duration-300">
                                {items.icon}
                            </div>
                        </a>
                    )
                })}
            </div>

            <div className="absolute w-full h-fit bottom-3 z-10 left-3">
                <h1 className="text-white font-bold font-poppins md:text-xl uppercase overflow-hidden text-md">{name}</h1>
                <h3 className="text-[#BDBDBD] font-bold font-poppins text-xs self-end">{pos}</h3>

            </div>

        </div>
    );
}

export default ProfileTemplate;
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { orgs } from '../../utils/List';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {

    const [ ref, view ] = useInView({ triggerOnce: true })

    return (
        <section>
            <div className="w-full h-auto bg-white relative flex flex-col">
                <div className="w-full h-[21.5rem] md:h-[25rem] border-2 flex flex-col text-center items-center font-poppins px-7 text-[#3F3F3F]">
                    <motion.p initial={{opacity: 0, y: 20}} whileInView={{opacity: 100, y:0}} transition={{duration: 0.6}}  className="mt-14">Organizations under</motion.p>
                    <motion.h1  initial={{opacity: 0, y: 20}} whileInView={{opacity: 100, y:0}} transition={{duration: 0.6, delay: 0.3}} className="text-[1.5rem] md:text-[2rem] mt-3 font-semibold  max-w-[40rem] md:mt-0 min-w-[20rem]">College of Engineering and Information Technology</motion.h1>
                </div>
                <div className="w-full h-[19rem] bg-[#1B783A]" ref={ref}>
                    <div className='w-[90%] h-[14rem] translate-y-[-40%] justify-start flex items-center mx-auto'>
                        <Swiper
                            spaceBetween={90}
                            className='w-full cursor-grab sm:max-w-[1700px] max-w-[500px]'
                            breakpoints={{
                                1536: {
                                    slidesPerView: 7,
                                    spaceBetween: 0

                                },
                                1280: {
                                    slidesPerView: 6,
                                    spaceBetween: 0
                                },
                                1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 0
                                },
                                760: {
                                    slidesPerView: 4,
                                    spaceBetween: 90
                                },
                                640: {
                                    slidesPerView: 3,
                                    spaceBetween: 90
                                },
                                1: {
                                    slidesPerView: 2,
                                    spaceBetween: 30
                                }
                            }}
                        >

                            {orgs.map((items, i) => {
                                return (
                                    <SwiperSlide key={items.label}>
                                        <a target="_blank" href={items.link} rel="noreferrer">
                                            <motion.div className='w-[10rem] sm:w-[11rem] h-[14.5rem] bg-greenButton rounded-lg overflow-hidden select-none cursor-pointer' initial={{opacity: 0, scale: 0}} animate={ view ? {opacity: 100, scale: 1} : {}} transition={{duration: 0.7, delay: i * 0.05}}>
                                                <div className='w-[60%] mx-auto h-[110px] mt-5'>
                                                    <Image alt={items.label} src={`/footer/${items.label}.webp`} width="150" height="150"></Image>
                                                </div>

                                                <div className="text-center px-2">
                                                    <p className='uppercase text-[#FBBA24] font-medium text-sm italic mt-2'>{items.label}</p>
                                                    <p className='text-[12px] text-center text-white font-light'>{items.word}</p>
                                                </div>

                                            </motion.div>
                                        </a>
                                    </SwiperSlide>
                                )
                            })}

                        </Swiper>
                    </div>
                    
                    <ul className='w-fit text-white mx-auto flex gap-x-9 font-raleway font-semibold mt-[-2rem]'>
                        <li className='cursor-pointer'>About</li>
                        <li className='cursor-pointer'>Products</li>
                        <li className='cursor-pointer'>Top</li>
                    </ul>
                    <div className='w-full h-[2px] bg-white opacity-30 mt-3'></div>

                    <p className='font-poppins text-white text-center text-sm mt-3'>© CEIT Tiger Shop 2023. All rights Reserve</p>
                </div>
            </div>
        </section>
    );
}

export default Footer;
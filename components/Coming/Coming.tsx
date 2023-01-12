import Image from 'next/image';
import overlay from '../../public/overlay.jpg'

const Coming = () => {
    return (
        <section className="h-fit pb-40 w-full bg-greenSteps relative bg-blend-overlay overflow-hidden border-b-8 border-b-[#003C14]" >
            <div className="absolute w-full h-full bg-greenSteps bg-blend-overlay" style={{ backgroundImage: `url(${overlay.src})` }}></div>

            <div className="h-fit w-[85%] max-w-[1600px] mx-auto">
                <div className="relative font-poppins mx-auto w-fit text-center mt-20 h-fit">
                    <p className="text-orangeBg font-medium">Be ready</p>
                    <h1 className="text-white text-4xl font-bold mt-2 z-10 relative">Coming this week</h1>
                    <Image src="/Triangle.svg" alt="triangle" height="100" width="100" className="hidden sm:block absolute bottom-[-2rem] left-[-2rem]"></Image>
                </div>

                <div className="w-[90%] max-w-[750px] xl:max-w-[950px] xl:h-[24rem]  md:h-[20rem] md:p-0 h-fit mx-auto mt-20 relative flex flex-col font-poppins gap-y-14 py-10 justify-center md:flex-row gap-x-20">

                    <div className="z-10 justify-center h-fit flex flex-col items-center md:h-full">
                        <div className="w-fit h-fit relative">
                            <Image src="/coming/Lanyard.webp" alt="Lanyard" width="200" height="200" className="w-[15rem] xl:w-[20rem] z-10 relative peer"></Image>
                            <div className="bg-orangeBg w-[95%] h-[95%] absolute top-0 m-auto bottom-0 left-0 right-0 peer-hover:translate-x-[1rem] peer-hover:translate-y-[-1rem] transition-all ease-in-out duration-300"></div>
                            <div className="bg-greenBg w-[95%] h-[95%] absolute top-0 m-auto bottom-0 left-0 right-0 peer-hover:translate-x-[-1rem] peer-hover:translate-y-[1rem] transition-all ease-in-out duration-300"></div>

                        </div>

                        <div className="bg-orangeBg text-greenBg text-center p-3 w-[15rem] mt-5 rounded-lg md:absolute md:bottom-[-1.5rem]">Lanyards</div>
                    </div>

                    <div className="z-10 justify-center h-fit flex flex-col items-center md:h-full">
                        <div className="w-fit h-fit relative">
                            <Image src="/coming/OrgShirt.webp" alt="Lanyard" width="200" height="200" className="peer xl:w-[20rem]  w-[15rem] z-10 relative"></Image>
                            <div className="bg-orangeBg w-[95%] h-[95%] absolute top-0 m-auto bottom-0 left-0 right-0 peer-hover:translate-x-[1rem] peer-hover:translate-y-[-1rem] transition-all ease-in-out duration-300"></div>
                            <div className="bg-greenBg w-[95%] h-[95%] absolute top-0 m-auto bottom-0 left-0 right-0 peer-hover:translate-x-[-1rem] peer-hover:translate-y-[1rem] transition-all ease-in-out duration-300"></div>
                        </div>

                        <div className="bg-orangeBg text-greenBg text-center p-3 w-[15rem] mt-5 rounded-lg md:absolute md:bottom-[-1.5rem]">Org Shirt</div>
                        <Image src="/Triangle.svg" alt="triangle" height="100" width="100" className="sm:block hidden absolute bottom-[-3rem] right-[-3rem]"></Image>
                    </div>

                    <div className="bg-white w-full h-full rounded-xl opacity-30 mx-auto absolute"></div>
                </div>
            </div>
        </section>
    );
}

export default Coming;
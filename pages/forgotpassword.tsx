import Image from 'next/image';

const Forgotpassword = () => {
    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[60%] lg:min-h-[450px] lg:max-h-[500px] lg:w-[40%] lg:max-w-[1000px] lg:flex mx-auto lg:rounded-3xl relative shadow-solid-greenButton">
                    
                    <h1>H123I</h1>
                </div>
            </div>
        </>
    );
}

export default Forgotpassword;
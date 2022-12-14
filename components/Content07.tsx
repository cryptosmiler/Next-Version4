import { useState, useEffect } from "react";
import Link from "next/link";
import { FaMailBulk, FaSkype, FaGithub, FaDiscord, FaTelegram, FaLinkedin } from 'react-icons/fa'
import { CopyToClipboard } from "react-copy-to-clipboard"

const Content07 = (props:any) => {

  const sendEmail = () => {    
    window.open("mailto:af.jaguarking@gmail.com?subject=Contact");
  };

  return (
    <div id="content07" className="absolute top-0 -z-10 left-0 w-screen h-screen pointer-events-auto opacity-0">
      <div className="w-screen h-screen flex justify-center items-center" style={{fontFamily:'Audiowide'}}>
        <div className="max-w-[390px]  md:max-w-full xl:max-w-[1440px] mx-auto p-4 md:p-8 text-[#FFFAFA] text-shadow1">
          <div className="
            text-[25px] leading-[35px] md:text-[35px] md:leading-[50px] xl:text-[45px] xl:leading-[60px]">
            <div className="h-[45vh] relative w-full">
              {/* <div className="w-full absolute bottom-24 text-center text-green">Let’s relieve stress.</div> */}
            </div>

            <div>
              <div className='w-fit mx-auto'>
                <div className='flex items-center justify-center'>
                  <div className=' font-normal'>
                    <div className=''>
                    </div>
                    <div className='py-4'>
                      <div>
                        GIVE ME A SHOUT
                      </div>
                      <div className='font-medium'>
                        <Link href={'#'}>
                          <a className='hover:text-amber-500' onClick={()=>sendEmail()}>
                            <div className=''>af.jaguarking@gmail.com</div>                
                          </a>
                        </Link>
                      </div>
                    </div>

                    <div className='pt-2'>
                      <div>                
                        LET&apos;S BE FRIENDS!
                      </div>
                      <div className='font-medium w-[300px] md:w-[400px] flex justify-between items-center'>
                        <Link href={'https://github.com/whroyal'}>
                          <a target={'_blank'} className='hover:text-amber-500'>
                            <FaGithub/>
                          </a>
                        </Link>
                        <Link href={'https://discord.gg/Num#4903'}>
                          <a target={'_blank'} className='hover:text-amber-500'>
                            <FaDiscord/>
                          </a>
                        </Link>
                        <Link href={'https://t.me/silverstarking'}>
                          <a target={'_blank'} className='hover:text-amber-500'>
                            <FaTelegram/>
                          </a>
                        </Link>
                        <Link href={'https://join.skype.com/invite/I0SO9yjWxnGU'}>
                          <a target={'_blank'} className='hover:text-amber-500'>
                            <FaSkype/>
                          </a>
                        </Link>
                      </div>                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default Content07
import Image from 'next/image'

export const Logo = () => (
   <Image
      src="logo.png" 
      width={75}
      height={75}
      alt="Picture of the author"
    />
);
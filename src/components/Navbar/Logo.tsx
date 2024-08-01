"use client"

import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <Image src={"/xlogo.png"} alt="logo" width={50} height={50}/>
      </Link>
    </div>
  )
}

export default Logo
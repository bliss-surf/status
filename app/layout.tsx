"use client"

import "./globals.css"
import {motion} from "framer-motion"

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <body>
        <motion.main
          initial={{opacity:0}}
          animate={{opacity:1}}
          className="min-h-screen flex items-center justify-center px-4"
        >
          <div className="w-full max-w-md">{children}</div>
        </motion.main>
      </body>
    </html>
  )
}

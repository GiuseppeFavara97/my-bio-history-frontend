'use client'
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import Image from "next/image"
import Register from "../auth/components/register/page"
import Login from "../auth/components/login/page"

export default function LoginRegister() {
    const [isRegister, setIsRegister] = useState(false)

    return (
        <div className="flex w-full outline relative overflow-hidden">

            <motion.div

                initial={false}
                animate={{ x: isRegister ? "200%" : "0%" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={`absolute left-0 top-0 h-full   w-1/3  bg-[#0f1b2b] 
                text-white flex flex-col justify-center items-center`}
            >
                <AnimatePresence mode="wait">
                    {!isRegister ? (
                        <motion.div
                            key="login-text"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <button
                                className="mb-4"
                                onClick={() => setIsRegister(true)}
                            >
                                Vai a Register →
                            </button>
                            <Image
                                src="logo.png"
                                width={200}
                                height={200}
                                alt="Picture of the author"
                            />
                            <h1 className="text-4xl font-bold">Bentornato</h1>
                            <p>Accedi per continuare</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register-text"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="text-center"
                        >
                            <button
                                className="mb-4"
                                onClick={() => setIsRegister(false)}
                            >
                                ← Torna al Login
                            </button>

                            <Image
                                src="logo.png"
                                width={200}
                                height={200}
                                alt="Picture of the author"
                            />
                            <h1 className="text-4xl font-bold">Welcome!</h1>
                            <p>You’re in the right place.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="flex w-full h-full">

                <div className={` flex justify-center items-center ${isRegister ? "w-full" : " w-3/4"}`}>
                    {isRegister && (
                        <motion.div
                            key="register-form"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-[70%]"
                        >
                            <Register />
                        </motion.div>
                    )}
                </div>

                <div className={` flex justify-center items-center ${isRegister ? "w-1/3" : "w-full"}`}>
                    {!isRegister && (
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-[70%]"
                        >
                            <Login />
                        </motion.div>
                    )}
                </div>

            </div>

        </div>
    )
}

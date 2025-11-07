import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
            <div className="grid md:grid-cols-3 gap-7">
                <div>
                    <Link href="/" className="mb-10-block">
                        <Image src="/logo_putih.png" width={128} height={49} alt="logo" />
                    </Link>
                    <p className="text-gray-200 text-justify">
                        Nyaline.id adalah platform reservasi hotel berbasis web yang dirancang untuk memberikan pengalaman pemesanan kamar yang cepat, aman, dan nyaman.
                    </p>
                </div>
                <div className="flex justify-center">
                    <div>
                        <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                        <ul className="list-item space-y-5 text text-gray-400">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/room">Rooms</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact Us</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
                
                <div>
                    <h4 className="mb-8 text-xl font-semibold text-white">Contact Us</h4>
                    <p className="text-gray-300">
                        Wanna talk more?
                    </p>
                    <form action="" className="mt-5">
                        <div className="mb-5">
                            <input type="text" name="email" placeholder="revolusialghifari@gmail.com" className="w-full p-3 rounded-sm bg-white" />
                        </div>
                            <button className="bg-orange-400 p-3 font-bold text-white w-full text-center rounded-sm hover:bg-orange-500">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
            &copy; Copyright 2025 | Nyaline.id | All Right Reserved
        </div>
    </footer>
  )
}

export default Footer
import {Metadata} from "next"
import {IoEyeOutline, IoLocateOutline} from "react-icons/io5";
import Image from "next/image";
import HeaderSection from "@components/header-section";

export const metadata: Metadata = {
    title: "About",
    description: "Who we are",
}
const AboutPage = () => {
  return (
    <div>
        <HeaderSection title="About Us" subTitle="Nyaline.id? What is it?"/>
        <div className="max-w-screen-xl mx-auto py-20 px-4">
            <div className="grid md:grid-cols-2 gap-8">
                <Image src="/panter.jpg" width={650} height={579} alt="about image"  />
                <div>
                    <h1 className="text-5xl font-semibold text-gray-900 mb-4">
                        Who we Are?
                    </h1>
                    <div className="text-gray-700 py-5 text-justify padding-right-5">
                        <p>
                            Nyaline.id adalah platform reservasi hotel berbasis web yang dirancang untuk memberikan pengalaman pemesanan kamar yang cepat, aman, dan nyaman.
                        </p> <br/>
                        <p>
                            Sistem ini mensimulasikan operasional sebuah hotel modern, mulai dari pencarian kamar, reservasi online, hingga manajemen kamar oleh admin hotel.
                        </p> <br/>
                        <p>
                            Hotel dalam proyek ini memiliki konsep “Modern Luxury Experience”, yaitu menggabungkan kemewahan interior dengan kemudahan digital.
                            Dengan tampilan elegan berwarna emas dan hitam, Nyaline.id menggambarkan nuansa eksklusif yang cocok untuk hotel berbintang lima.
                        </p> 
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default AboutPage
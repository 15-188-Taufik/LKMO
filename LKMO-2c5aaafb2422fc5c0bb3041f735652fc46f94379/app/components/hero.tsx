import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/hero.png"
      alt="hero"
      fill
      className="object-cover object-center w-full h-full"
    />
  </div>

  {/* Overlay gelap */}
  <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

  {/* Konten di atas overlay */}
  <div className="relative z-20 flex flex-col justify-center items-center h-full text-center">
    <h1 className="text-7xl font-extrabold leading-tight mb-8 capitalize">
      Book your luxury room
    </h1>
    <p className="text-xl text-gray-300 mb-8">
      Get special offers just for you today.
    </p>
    <div className="flex gap-5">
      <Link
        href="/room"
        className="bg-orange-400 text-white hover:bg-orange-500 py-2 px-6 md:px-10 text-lg font-semibold rounded-sm transition transform hover:scale-105 hover:shadow-lg"
      >
        Book Now
      </Link>
      <Link
        href="/contact"
        className="bg-transparent border border-orange-400 text-white hover:bg-orange-500 py-2 px-6 md:px-10 text-lg font-semibold rounded-sm transition transform hover:scale-105 hover:shadow-lg"
      >
        Contact Us
      </Link>
    </div>
  </div>
</div>

  );
};

export default Hero;

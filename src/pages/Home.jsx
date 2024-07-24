import HomeNav from "../components/HomeNav";
import SearchComponent from "../components/SearchComponent";
import StickyBar1 from "../components/StickBar1";
import Testimonial from "../components/Testimonial";
import HomeFooter from "../components/HomeFooter";

export default function Home() {

  return (
    <>
      <div className="">
        <HomeNav />
        <StickyBar1 />
          <div className="banner flex flex-col">
            <div className="py-4 mt-24 mb-5">
              <h1 className="text-pretty text-2xl md:text-4xl text-center text-white">
                Get 20% off on self-drive car rentals
              </h1>
              <h1 className="text-pretty text-center text-white">
                BOOK YOUR DRIVE NOW
              </h1>
            </div>
            <div className="mx-4 md:mx-36 mb-56">
              <SearchComponent isHome={true} isBooking={false}/>
            </div>
          </div>
          {/* blackbar */}
          <div className="flex flex-row shrink  bg-black justify-evenly space-x-10 py-4">
            <div className="flex flex-col shrink self-center">
                <h1 className="text-pretty text-2xl md:text-3xl font-bold text-center text-white">
                 25,000+
                </h1>
                <h1 className="text-pretty text-center text-white">
                Verified Cars
                </h1>
            </div>
            <div className="flex flex-col shrink">
                <h1 className="text-pretty text-2xl md:text-3xl font-bold text-center text-white">
                20,000+ 
                </h1>
                <h1 className="text-pretty text-center text-white">
                Trusted Hosts
                </h1>
            </div>
            <div className="flex flex-col shrink">
                <h1 className="text-pretty text-2xl md:text-3xl font-bold text-center text-white">
                2 Billion+ 
                </h1>
                <h1 className="text-pretty text-center text-white">
                KMs Driven
                </h1>
            </div>
            <div className="flex flex-col shrink">
                <h1 className="text-pretty text-2xl md:text-3xl font-bold text-center text-white">
                38+ Cities
                </h1>
                <h1 className="text-pretty text-center text-white">
                And Counting... 
                </h1>
            </div>
            <div className="flex flex-col shrink">
                <h1 className="text-pretty text-2xl md:text-3xl font-bold text-center text-white">
                20+ Airports
                </h1>
                <h1 className="text-pretty text-center text-white">
                Live On Auto-share platform
                </h1>
            </div>
          </div>
          {/* process bar section */}
          <div className="bg-zinc-200 text-center w-full p-8">
            <div className="flex flex-col self-center py-24 gap-5 space-y-14 ">
                <div className="text-center font-bold text-xl">How to Book Rental Cars in Chennai with Zoomcar?</div>
                <div className="flex flex-col self-center lg:flex-row justify-center space-x-8">
                    {/* 1 */}
                    <div className="flex flex-col">
                        <div className="bg-white shadow-xl rounded-2xl size-28 self-center">
                            <img src="https://www.zoomcar.com/img/download.png" className="rounded-2xl "  />
                        </div>
                        <h1 className="text-pretty font-semibold ">Log onto zoomcar.com or use the app</h1>
                    </div>
                    {/* 2 */}
                    <div className="flex flex-col">
                        <div className="bg-white shadow-xl rounded-2xl size-28 self-center">
                            <img src="https://www.zoomcar.com/img/time-location-select.png" className="rounded-2xl size-28"  />
                        </div>
                        <h1 className="text-pretty font-semibold ">Select city, date and time</h1>
                    </div>
                    {/* 3 */}
                    <div className="flex flex-col">
                        <div className="bg-white shadow-xl rounded-2xl size-28 self-center">
                            <img src="https://www.zoomcar.com/img/deposit.png" className="rounded-2xl pt-4"  />
                        </div>
                        <h1 className="text-pretty font-semibold ">Pick a car of your choice at 0 security deposit</h1>
                    </div>
                    {/* 4 */}
                    <div className="flex flex-col">
                        <div className="bg-white shadow-xl rounded-2xl size-28 self-center">
                            <img src="https://www.zoomcar.com/img/zoomaway.png" className="rounded-2xl pt-4"  />
                        </div>
                        <h1 className="text-pretty font-semibold ">Zoomaway with the freedom of unlimited KMs</h1>
                    </div>
                </div>
            </div>
          </div>
        {/* testimonial section */}
        <div className="p-8 mt-5">
             <Testimonial/>  
        </div>
        {/* footer section */}
        <HomeFooter/>
         

      </div>
    </>
  );
}

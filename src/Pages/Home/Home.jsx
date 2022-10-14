import React from "react";
import useTitle from "../../Hooks/useTitle";
import banner from "../../Assets/banner.jpg";

export default function Home() {
  useTitle("Home");
  return (
    <div className="bg-base-100 h-screen">
      <section className="body-font bg-base-100">
        <div className="container mx-auto flex px-5 py-6 md:py-20 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-4/6 w-full mb-10 object-cover object-center rounded-2xl"
            alt="todo"
            src={banner}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
              Overview
            </h1>
            <p className="mb-8 text-start">
              Settyl is the industry's first Low-code supply chain visibility
              platform that helps to propel next-generation digital
              transformation. <br /> <br/>
              We accelerate shippers, logistics service providers, and freight
              broker's businesses by providing connected solutions to digitize
              procurement, pre-shipment, in-transit, and post-shipment document
              phases of the supply chain cycle. <br /><br/>
              Mission: Inclusive digital growth for All <br /><br/>
              Settyl aims to democratize the end-to-end supply chain visibility
              and plug the digital divide via "Inclusiveness Movement." <br /><br/>
              Network and collaborate using Settyl's platform to entail one's
              fair share in the integrated business environment and accomplish
              your chores. <br /><br/>
              Learn more : https://www.settyl.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

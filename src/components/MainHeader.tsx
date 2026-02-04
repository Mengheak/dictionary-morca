import React from "react";

const MainHeader: React.FC = () => {
  return (
    <header
      className="
        relative
        flex items-center justify-center md:justify-start
        shadow-sm
        gap-4 md:gap-6
        px-4 md:px-10
        py-4 md:py-5
        border-b border-black/5
      "
      style={{
        backgroundImage: "url('/header_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
        <img
          src="/logo.png"
          alt="Ministry of Cult and Religion logo"
          loading="lazy"
          className="w-[90px] md:w-[110px] shrink-0"
        />

        <div className="leading-snug">
          <h1 className="text-xl md:text-2xl font-bold text-[#253b91]">
            ក្រសួងធម្មការនិងកិច្ចការសាសនា
          </h1>
          <p className="mt-1 text-sm md:text-base font-semibold text-[#253b91]/80 uppercase tracking-wider">
            Ministry of Cult and Religion
          </p>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;

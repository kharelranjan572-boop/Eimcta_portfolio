import React from "react";
import { Link } from "react-router-dom";

export default function SkewedCTA() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Link
        to="/admin_panel"
        className="group flex items-center px-11 py-2.5 text-[40px] text-white no-underline \
                   bg-[#6225E6] shadow-[6px_6px_0_#000] \
                   skew-x-[-15deg] transition-all duration-1000 \
                   hover:shadow-[10px_10px_0_#FBC638] hover:duration-500"
        style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}
      >
        {/* Text */}
        <span className="skew-x-[15deg] uppercase tracking-wider">Admin</span>

        {/* Arrow */}
        <span
          className="relative top-[12%] ml-[30px] w-[20px] skew-x-[15deg] \
                     transition-all duration-500 \
                     group-hover:mr-[45px]"
        >
          <svg
            width="40"
            height="24"
            viewBox="0 0 72 43"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="one translate-x-[-60%] transition-all duration-400 \
                         group-hover:translate-x-0 group-hover:animate-[colorAnim_1s_infinite_0.6s]"
              fill="white"
              d="M42.5 2.5l26 18.9c1.8 1.3 1.8 3.3 0 4.6l-26 18.9-3.6-2.9 22-15.9H0v-4h60.9L38.9 5.4z"
            />
            <path
              className="two translate-x-[-30%] transition-all duration-500 \
                         group-hover:translate-x-0 group-hover:animate-[colorAnim_1s_infinite_0.4s]"
              fill="white"
              d="M42.5 2.5l26 18.9c1.8 1.3 1.8 3.3 0 4.6l-26 18.9-3.6-2.9 22-15.9H0v-4h60.9L38.9 5.4z"
            />
            <path
              className="three group-hover:animate-[colorAnim_1s_infinite_0.2s]"
              fill="white"
              d="M42.5 2.5l26 18.9c1.8 1.3 1.8 3.3 0 4.6l-26 18.9-3.6-2.9 22-15.9H0v-4h60.9L38.9 5.4z"
            />
          </svg>
        </span>
      </Link>

      {/* Tailwind keyframes */}
      <style>{`
        @keyframes colorAnim {
          0% { fill: white; }
          50% { fill: #FBC638; }
          100% { fill: white; }
        }
      `}</style>
    </div>
  );
}

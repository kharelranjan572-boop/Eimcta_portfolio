// components/AnimatedLink.js
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const AnimatedLink = ({ to, children, className = "", onClick }) => {
    return (
        <NavLink to={to} onClick={onClick}>
            {({ isActive }) => (
                <motion.div
                    whileHover={{
                        scale: [1, 1.12, 1.02, 1.08, 1],
                        transition: {
                            duration: 0.9,
                            ease: "circInOut",
                        },
                    }}
                    whileTap={{ scale: 0.95 }}

                    className={`${className} ${isActive ? "text-blue-700 font-bold" : ""}`}
                >
                    {children}
                </motion.div>
            )}
        </NavLink>
    );
};

export default AnimatedLink;

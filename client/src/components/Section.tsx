import type React from "react";

type SectionProps = {
  className?: string;
  id?: string;
  children: React.ReactNode;
};

/**
 * A wrapper element to create landing page sections
 * @param {string} className - An optional prop that adds TailwindCSS styles
 * @param {string} id - A string ID for this section
 * @param {React.ReactNode} children - The React node children
 */
function Section({ className, id, children }: SectionProps) {
  return (
    <div
      id={id}
      className={`w-screen h-screen py-[5%] md:px-[8%] px-[5%] bg-dark-grey overflow-x-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export default Section;

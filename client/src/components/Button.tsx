type ButtonProps = {
  onClick: any;
  className?: string;
  children?: React.ReactNode;
};

/**
 * A custom-made button component
 * @component
 * @param {any} onClick - The function that runs when this button is clicked
 * @param {string} className - An optional prop that sets TailwindCSS styles for the component
 * @param {React.ReactNode} children - Any children React components
 */
function Button({ onClick, className, children }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`outline-1 border-light-grey rounded-2xl px-3 py-1 text-lg hover:cursor-pointer hover:outline-4 bg-gradient-to-br from-black/1 to-blue hover:bg-gradient-tl hover:from-blue hover:to-black/1 transition-all duration-300 ${className}`}
      >
        {children}
      </button>
    </>
  );
}

export default Button;

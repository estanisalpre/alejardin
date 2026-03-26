export function Footer() {
  return (
    <footer className="mt-16 py-8 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-xl text-gray-600 handwriting leading-relaxed">
          Con mucho 💗 para Alejandra,
          <br />
          que le encantan las flores.
        </p>
      </div>

      <style jsx>{`
        .handwriting {
          font-family: "Dancing Script", "Brush Script MT", cursive;
          font-weight: 500;
        }
      `}</style>
    </footer>
  );
}

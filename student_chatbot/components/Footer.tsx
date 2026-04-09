export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">SEPU</h3>
          <p className="text-sm">Smart Education Private University. Empowering the next generation of leaders.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <p className="text-sm mb-2">Email: admissions@sepu.edu</p>
          <p className="text-sm">Phone: +91 1800-123-4567</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Campus</h4>
          <p className="text-sm">123 University Road,<br />Education City, 400001</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-sm text-center">
        © {new Date().getFullYear()} SEPU. All rights reserved.
      </div>
    </footer>
  );
}
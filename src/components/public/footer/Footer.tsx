import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-zinc-900 text-white px-8 py-10">
      <div className="md:w-[1350px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logo-sin-fondo-letras.png"
              alt="Logo"
              width={200}
              height={100}
              className="hidden md:flex"
            ></Image>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-gold-500">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>Catalog</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-gold-500">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Inventory</li>
              <li>Vehicle Financing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-gold-500">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                7 Donaldson Rd
                <br />
                Greenville, SC 29605
              </li>
              <li>+1 (864) 417-6676</li>
              <li>info@lionmotorsgroup.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-500 mt-8 pt-5 flex flex-col md:flex-row justify-between gap-3 text-sm text-gold-500">
          <p>© 2026 Lion Motors Group. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

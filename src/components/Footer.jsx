import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
        {/* اللوجو واسم الموقع على الشمال */}
        <div className="flex items-center space-x-4">
          <Image
            src="/images/au.png"
            alt="Arab Universe Logo"
            width={60}
            height={60}
          />
          <p className="text-xl font-semibold">Arab Universe</p>
        </div>

        {/* الروابط على اليمين */}
        <nav className="flex flex-col items-end space-y-2 text-base">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/rules" className="hover:text-blue-400 transition-colors">
            Rules
          </Link>
          <Link
            href="/creators"
            className="hover:text-blue-400 transition-colors"
          >
            Creators
          </Link>
          <Link href="/jobs" className="hover:text-blue-400 transition-colors">
            Jobs
          </Link>
        </nav>
      </div>

      {/* الفوتر الأساسي */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4 mt-6 px-8">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Arab Universe. All rights reserved.
        </p>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <p className="text-sm">Developed by Hassan</p>
          <a
            href="https://discord.com/users/829082497576206377"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-500 transition-colors"
          >
            <Image
              src="/images/discord-icon.png"
              alt="Discord"
              width={24}
              height={24}
            />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

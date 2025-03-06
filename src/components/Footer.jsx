import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p>© {new Date().getFullYear()} Arab Universe. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <p>Developed by Hassan</p>
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
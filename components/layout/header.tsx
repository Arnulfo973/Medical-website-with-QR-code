import { UserNav } from './user-nav';

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end bg-sky-500">
        <div className='flex justify-start items-end w-[50%]'>
          <p className='text-4xl font-extrabold text-red-600'>MED</p>
          <p className='text-xl font-semibold text-white ml-1'>ACCES</p>
        </div>
        <div className="flex items-center justify-end gap-2 w-[50%]">
          <UserNav />
        </div>
      </nav>
    </header>
  );
}

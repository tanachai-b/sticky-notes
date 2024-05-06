import { usePathname, useRouter } from "next/navigation";

import { Icon, IconButton } from "./common";

export function NavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={`flex flex-wrap px-2.5 ${className}`}>
      <IconButton
        icon={<Icon className="text-xl" icon="sticky_note" />}
        text="Sticky Notes"
        active={pathname === "/sticky-notes"}
        onClick={() => router.push("/sticky-notes")}
      />

      <div className="grow" />
    </nav>
  );
}

import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return (
    <main className="h-full flex flex-col justify-between relative w-[inherit] max-w-[inherit]">{children}</main>
  );
}

export function Header({ children }: PropsWithChildren) {
  return (
    <div className="min-h-10 w-[inherit] max-w-[inherit]">
      <div
        className="z-10 bg-sky-300 h-10 fixed w-[inherit] max-w-[inherit]"
      >
        {children}
      </div>
    </div>
  );
}

export function Body({ children }: PropsWithChildren) {
  return <section className="grow">{children}</section>;
}

export function Footer({ children }: PropsWithChildren) {
  return (
    <div className="min-h-10 w-[inherit] max-w-[inherit]">
      <div
        className="z-10 fixed bottom-0 bg-sky-300 h-10 w-[inherit] max-w-[inherit]"
      >
        {children}
      </div>
    </div>
  );
}

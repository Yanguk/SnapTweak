import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return (
    <main className="size-full flex flex-col justify-between">{children}</main>
  );
}

export function Header({ children }: PropsWithChildren) {
  return (
    <div className="min-h-8 w-full">
      <div className="h-8 fixed w-full top-0 bg-sky-300">{children}</div>
    </div>
  );
}

export function Body({ children }: PropsWithChildren) {
  return <section className="grow">{children}</section>;
}

export function Footer({ children }: PropsWithChildren) {
  return (
    <div className="min-h-8 w-full">
      <div className="fixed bottom-0 bg-sky-300 h-8 w-full">{children}</div>
    </div>
  );
}


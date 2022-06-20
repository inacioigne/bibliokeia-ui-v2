import Navbar from "src/opac/components/navbar";

export default function LayoutOpac({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

import { useLocation } from "react-router-dom";
export function Heading() {
  const url = useLocation();
  return (
    <p
      style={{
        textAlign: "center",
        backgroundColor: "black",
        borderRadius: "10px",
        padding: "10px",
        width: "50%",
        margin: "0 auto",
        marginTop: "30px",
      }}
    >
      {url.pathname === "/" ? "Popular Books" : "Add Book"}
    </p>
  );
}

import Board from "@/components/Board";
import Menu from "@/components/Menu/index";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Menu></Menu>
      <Board></Board>
    </div>
  );
}

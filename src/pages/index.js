import Board from "@/components/Board";
import Menu from "@/components/Menu/index";
import Toolbox from "@/components/Toolbox";

export default function Home() {
  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      <Menu></Menu>
      <Toolbox></Toolbox>
      <Board></Board>
    </div>
  );
}

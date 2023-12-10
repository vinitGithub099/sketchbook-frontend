import Board from "@/components/Board/index";
import Menu from "@/components/Menu/index";
import Toolbox from "@/components/Toolbox/index";

export default function Home() {
  return (
    <div className="w-full h-screen bg-white">
      <Menu></Menu>
      <Toolbox></Toolbox>
      <Board></Board>
    </div>
  );
}

import { Bumps } from "@/components/bumps";
import { Eye } from "@/components/eye";

function Monster() {
  return (
    <div className="flex aspect-[422/432] w-full items-center justify-center overflow-hidden rounded-t-[120px] bg-[var(--theme)]">
      <div className="flex w-[96%] items-center justify-center gap-1">
        <Eye />
        <Eye isRightEye />
      </div>
    </div>
  );
}

export function EyeCard() {
  return (
    <div className="relative w-full max-w-[458px] bg-[var(--cream-background)]">
      <div className="flex flex-col gap-2 p-[18px]">
        <div className="w-full">
          <Bumps />
          <Monster />
        </div>
        <div className="flex flex-col gap-[55px] py-[9px] text-black">
          <div>
            <h1 className="text-[clamp(44px,14vw,64px)] font-bold leading-[1.06]">脑壳有包</h1>
            <p className="text-[24px] font-medium">naokeyoubao.com</p>
          </div>
          <p className="text-[16px] font-medium">有的会消，有的会长大，有的一直疼。</p>
        </div>
      </div>
    </div>
  );
}

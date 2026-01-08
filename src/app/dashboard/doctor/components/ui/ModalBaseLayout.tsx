import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { ReactJsxRuntime } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

type ModalBaseLayoutProps = {
  children: React.ReactNode;
  children2?: React.ReactNode;
  label?: string;
  className?: string;
  onClose: (v: boolean) => void;
};

export default function ModalBaseLayout({ children, children2, label, className, onClose }: ModalBaseLayoutProps) {
  return (
    <div className="z-1000 absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/30">
      <div className={cn(`max-w-1/2 relative flex  rounded-2xl bg-white p-5 outline `, className)}>
      <div>{children2}</div>
        <div className="flex flex-col  gap-5">
          <span className="p-0.5 text-center text-xl font-bold">{label}</span>
          <button
            type="button"
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full ring-2 hover:bg-red-400 hover:ring-red-800"
            onClick={() => onClose(false)}
          >
            <ArrowLeft />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}

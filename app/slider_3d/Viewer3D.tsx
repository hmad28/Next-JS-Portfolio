"use client";

import dynamic from "next/dynamic";

const Avatar3D = dynamic(() => import("./Avatar-nobg"), {
  ssr: false,
});

export default function Viewer3D() {
  return (
    <div className="w-full h-full">
      <Avatar3D />
    </div>
  );
}

"use client";

import SpecularButton from "../specular-button";

export default function PrintButton() {
  return (
    <SpecularButton
      size="sm"
      onClick={() => window.print()}
      tint="#182126"
      tintOpacity={0.82}
      textColor="#edf1ed"
      lineColor="#d4a85c"
      baseColor="#53615a"
      className="resume-print-button"
    >
      save as PDF ↓
    </SpecularButton>
  );
}

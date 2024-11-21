import {CSSProperties} from "react";
import {alignItems, flexDir, justifyContents} from "@/components/atom/layout/typo";
import {getJustifyContents, proccessJustifyContents} from "@/components/atom/layout/helper";

const Spacing = {

} as const;

interface IFlex {
  flexDir: flexDir,
  justifyContents: justifyContents;
  alignItems: alignItems;
  wrap: boolean;
  className: string;
  children: React.ReactNode;
}

export default function Flex({
  flexDir,
  justifyContents,
  alignItems,
  wrap,
  className,
  children
}) {
  const style: CSSProperties ={
    flexDirection: flexDir === 'row' ? 'row' : 'column',
    justifyContent: proccessJustifyContents(justifyContents),
    al
  }
  return <div style={}>
    {children}
  </div>;
}

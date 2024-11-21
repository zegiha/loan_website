import {CSSProperties} from "react";
import {IFlex} from "@/components/atom/layout/type";
import {processSortingProp, processWidth} from "@/components/atom/layout/helper";



export default function Flex({
  width,
  flexDir,
  justifyContents,
  alignItems,
  wrap,
  gap,
  className,
  style,
  children
}: IFlex) {
  const genericStyle: CSSProperties = {
    display: 'flex',
    width: processWidth(width),
    flexDirection: flexDir === 'row' ? 'row' : 'column',
    justifyContent: processSortingProp(justifyContents),
    alignItems: processSortingProp(alignItems),
    flexWrap: wrap ? 'wrap' : undefined,
    gap: gap,
  };
  return <div style={{
    ...genericStyle,
    ...style
  }} className={className}>
    {children}
  </div>;
}

import {CSSProperties} from "react";
import {IFlex} from "@/components/atoms/layout/flex/type";
import {processSortingProp, processWidth} from "@/components/atoms/layout/flex/helper";



export default function Flex({
  width,
  flexDir,
  justifyContents,
  alignItems,
  wrap,
  gap,
  className,
  style,
  children,
  ref,
  onClick,
  onTransitionEnd,
  onTransitionRun,
}: IFlex) {
  const genericStyle: CSSProperties = {
    display: 'flex',
    width: processWidth(width),
    flexDirection: flexDir === 'row' ? 'row' : flexDir !== undefined ? 'column' : undefined,
    justifyContent: processSortingProp(justifyContents),
    alignItems: processSortingProp(alignItems),
    flexWrap: wrap ? 'wrap' : undefined,
    gap: gap,
  };
  return <div
    style={{
      ...genericStyle,
      ...style
    }}
    className={className}
    ref={ref}
    onClick={onClick}
    onTransitionEnd={onTransitionEnd}
    onTransitionRun={onTransitionRun}
  >
    {children}
  </div>;
}

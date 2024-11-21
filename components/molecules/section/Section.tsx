import {Col} from "@/components/atom/layout/Col";
import style from './section.module.scss';
import semantic from '@/shared/color/semanticPalette.module.scss'

export default function Section({backgroundColor, children}: {backgroundColor?: 'surface' | 'surfaceDim', children: React.ReactNode}) {
  return (
    <Col
      width={'fill'}
      gap={24}
      className={`${style.section} ${backgroundColor === 'surface' ? semantic.surfaceSurface : semantic.surfaceSurfaceDim}`}
    >
      {children}
    </Col>
  );
}

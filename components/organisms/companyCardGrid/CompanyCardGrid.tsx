import style from './companyCardGrid.module.scss';

export default function CompanyCardGrid({children}: {children: React.ReactNode}) {
  return <div className={style.grid}>
    {children}
  </div>
}

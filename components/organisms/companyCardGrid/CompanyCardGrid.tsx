'use server'
import style from './companyCardGrid.module.scss';

export default async function CompanyCardGrid({children}: {children: React.ReactNode}) {
  return <div className={style.grid}>
    {children}
  </div>
}

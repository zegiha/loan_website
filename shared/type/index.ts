import {TPrimaryAndGenericColorString} from "@/shared/type/primaryAndGenericColorString";
import {TRegisterStatus} from "@/shared/type/loanCompanyAndPostTableData";
import {IPremium_banner_data} from "@/shared/type/IPremium_banner";
import {ILoan_inquiry_data} from "@/shared/type/inquiry/ILoan_inquiry";
import {INotification_data} from "@/shared/type/INotification";
import {ICompany_banner_data} from "@/shared/type/company/ICompany_banner";
import {ICompany_row, ICompany_row_having_is_visible_company_name} from "@/shared/type/company/ICompany_row";
import {ICompany_detail} from "@/shared/type/company/ICompany_detail";
import {ILoan_inquiry_detail} from "@/shared/type/inquiry/ILoan_inquiry_detail";
import ICertified_company_summary from "@/shared/type/company/ICertified_company_summary";
import ICertified_company from "@/shared/type/company/ICertified_company";
import ILoan_inquiry_consultation_available_companies
  from "@/shared/type/inquiry/ILoan_inquiry_consultation_available_companies";
import TLocation from "@/shared/type/TLocation";
import IBanner_req from "@/shared/type/advertisement/IBanner_req";
import ILine_req from "@/shared/type/advertisement/ILine_req";
import IPremium_banner_req from "@/shared/type/advertisement/IPremium_banner_req";
import ISponsor_link_req from "@/shared/type/advertisement/ISponsor_link_req";
import TAll_req from "@/shared/type/advertisement/TAll_req";
import TAds_name from "@/shared/type/advertisement/TAds_name";
import TAds_type from "@/shared/type/advertisement/TAds_type";
import IProduct_banner_req from "@/shared/type/advertisement/IProduct_banner_req";
import ILocation_banner_req from "@/shared/type/advertisement/ILocation_banner_req";
import ITop_banner_req from "@/shared/type/advertisement/ITop_banner_req";
import adTypeGuard from "@/shared/type/advertisement/adTypeGuard";

export {
  adTypeGuard
}

export type {
  TPrimaryAndGenericColorString,
  TRegisterStatus,
  IPremium_banner_data,
  ILoan_inquiry_data,
  INotification_data,
  ICompany_banner_data,
  ICompany_row,
  ICompany_row_having_is_visible_company_name,
  ICompany_detail,
  ILoan_inquiry_detail,
  ICertified_company_summary,
  ICertified_company,
  ILoan_inquiry_consultation_available_companies,
  TLocation,
  TAds_type,
  IBanner_req,
  ILine_req,
  IPremium_banner_req,
  ISponsor_link_req,
  TAll_req,
  TAds_name,
  ILocation_banner_req,
  IProduct_banner_req,
  ITop_banner_req,
}

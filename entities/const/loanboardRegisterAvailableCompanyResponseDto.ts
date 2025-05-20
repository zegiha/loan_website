import {LoanboardResponseDto} from "@/entities/const/loanboardResponseDto";
import {CompanyResponseDto} from "@/entities/const/companyResponseDto";

interface LoanboardRegisterAvailableCompanyResponseDto extends LoanboardResponseDto {
  companies: Array<CompanyResponseDto>
}

export default LoanboardRegisterAvailableCompanyResponseDto

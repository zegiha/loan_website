import { LoanboardResponseDto } from "@/entities/const/loanboardResponseDto";
import { CompanyResponseDto } from "@/entities/const/companyResponseDto";
import {UserResponseDto} from '@/entities/const/userResponseDto'

interface LoanboardRegisterAvailableCompanyResponseDto
  extends LoanboardResponseDto {
  companies: Array<CompanyResponseDto>;
  user: UserResponseDto
}

export default LoanboardRegisterAvailableCompanyResponseDto;

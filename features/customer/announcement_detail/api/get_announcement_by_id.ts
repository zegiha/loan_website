import {IAnnounccement_post} from "@/features/customer/announcement_detail/lib/type";

export default function get_announcement_by_id(id: string | number): IAnnounccement_post {
  return {
    title: '휴대폰 사기 피해 주의 요망',
    contents: `안녕하세요.
대출나라 운영팀입니다.

본인인증 서비스 점검 안내드립니다.

■ 작업 일시: (1차) 2024.12.24(화) 02:10 ~ 02:20(5분)
                  (2차) 2025.01.07(화) 02:10 ~ 02:20(5분)
                  (3차) 2025.01.17(금) 01:10 ~ 02:15(2분씩, 3회)
■ 작업 내용 : SKT 내부 시스템 작업
■ 작업 영향 : 작업시간 중 SKT 휴대폰 본인확인 서비스 일시 중단 

* PASS 본인인증은 영향 없습니다.
* SKT, SKT 알뜰폰 모두 적용됩니다.
* SKT를 제외한 타통신사는 인증은 영향 없습니다.

작업시간 중 SKT본인인증 서비스 중단됩니다.
불편하시더라도 점검 시간 이후 서비스 이용해 주시기 바랍니다.

원활한 서비스 공급을 위한 점검 작업으로,
넓은 양해 부탁드리며 이용에 불편을 드려
대단히 죄송합니다.

감사합니다.`,
    created_date: new Date(),
    view_cnt: 123,
  }
}

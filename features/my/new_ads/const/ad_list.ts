import {IAd} from "@/features/my/new_ads/type";
import tmp_img from '@/public/img/tmp_img.avif';

const ad_list: Array<IAd> = [
  {
    type_name: 'premium_banner',
    name: '프리미엄 배너광고',
    default_price: 1500000,
    price_desc: [
      {
        desc: '30일 기준',
        price: '1,500,000원',
      }
    ],
    sub_price_desc: null,
    desc: '홈, 지역별 업체검색, 상품별 업체검색\n화면 상단에 보여집니다',
    sub_desc: null,
    pc_preview_img: [tmp_img, tmp_img],
    mobile_preview_img: [tmp_img, tmp_img],
  },
  {
    type_name: 'banner',
    name: '메인 베너광고',
    default_price: 2000000,
    price_desc: [
      {
        desc: '30일 기준',
        price: '2,000,000원',
      }
    ],
    sub_price_desc: null,
    desc: '홈 화면 배너 리스트에 보여집니다',
    sub_desc: null,
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'banner',
    name: '메인 TOP 배너광고',
    default_price: 2500000,
    price_desc: [
      {
        desc: '30일 기준',
        price: '2,500,000원',
      }
    ],
    sub_price_desc: null,
    desc: '홈 화면 상단에 보여집니다',
    sub_desc: null,
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'sponsor_link',
    name: '스폰서 링크',
    default_price: 1000000,
    price_desc: [
      {
        desc: '30일 기준',
        price: '1,000,000원',
      }
    ],
    sub_price_desc: null,
    desc: '고객센터를 제외한 모든 페이지에\nPC 환경에서 보여집니다',
    sub_desc: null,
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'product_banner',
    name: '상품 배너 광고',
    default_price: 300000,
    price_desc: [
      {
        desc: '30일 기준 - 상품 3개',
        price: '300,000원',
      }
    ],
    sub_price_desc: {
      desc: '상품 1개 추가 당',
      price: '100,000원',
    },
    desc: '상품별 업체검색에서 해당 상품 선택 시 보여집니다',
    sub_desc: null,
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'location_banner',
    name: '지역 배너광고',
    default_price: 200000,
    price_desc: [
      {
        desc: '30일 기준 - 지역 1개',
        price: '200,000원',
      },
      {
        desc: '30일 기준 - 지역 2개',
        price: '400,000원',
      },
      {
        desc: '30일 기준 - 지역 3개',
        price: '500,000원',
      },
    ],
    sub_price_desc: {
      desc: '지역 3개 이상부터는 추가 시',
      price: '100,000원',
    },
    desc: '지역별 업체검색에서 해당 지역 선택 시 보여집니다',
    sub_desc: null,
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'no_data_req',
    name: '배너 베스트 뱃지효과',
    default_price: 100000,
    price_desc: [
      {
        desc: '30일 기준 - 배너 1개',
        price: '100,000원',
      }
    ],
    sub_price_desc: null,
    desc: '지역배너, 상품배너만 적용 가능합니다',
    sub_desc: null,
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'no_data_req',
    name: '실시간 대출문의 업체 등록',
    default_price: 300000,
    price_desc: [
      {
        desc: '400회',
        price: '300,000원',
      }
    ],
    sub_price_desc: null,
    desc: '일일 사용 횟수 제한 : 50개\n한 문의글에 15개 업체만 등록 가능합니다',
    sub_desc: '광고 연장 시 남은 개수는 이월되며, 광고 미연장 시 소멸됩니다',
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'line',
    name: '줄광고',
    default_price: 500000,
    price_desc: [
      {
        desc: '50만원 이상 무료 점프',
        price: '5회',
      },
      {
        desc: '60만원~100만원 무료 점프',
        price: '10회',
      },
      {
        desc: '110만원 이상 무료 점프',
        price: '15회',
      },
    ],
    sub_price_desc: null,
    desc: '유로 배너광고 등록 시\n모든 업체 광고비용 상관없이 줄광고 1개 등록 가능하며,\n줄광고 점프 사용 횟수는 광고비에 따라 차등 지급됩니다',
    sub_desc: null,
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
  {
    type_name: 'no_data_req',
    name: '줄광고 점프 추가 사용',
    default_price: 300000,
    price_desc: [
      {
        desc: '500회',
        price: '300,000원',
      }
    ],
    sub_price_desc: null,
    desc: '일일 사용 횟수 제한 없음\n무료 점프 횟수 소진 시 추가로 사용할 수 있는 상품입니다',
    sub_desc: '광고 연장 시 남은 개수는 이월되며, 광고 미연장 시 소멸됩니다',
    pc_preview_img: [tmp_img],
    mobile_preview_img: [tmp_img],
  },
]

export default ad_list

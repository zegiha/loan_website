export default function get_announcement(n: number): Array<Array<IAnnouncement_summary>> {
  const normal_dummy: IAnnouncement_summary = {
    post_id: 'post_id',
    type: 'normal',
    title: '휴대폰 사기 피해 주의 요망',
    created_date: new Date(),
    view_cnt: 123,
  }
  const variable_dummy: IAnnouncement_summary = {
    post_id: 'post_id',
    type: 'variable',
    title: '휴대폰 사기 피해 주의 요망',
    created_date: new Date(),
    view_cnt: 123,
  }

  const res_temp: Array<IAnnouncement_summary> = []

  for(let i = 0; i < 3; i++) {
    res_temp.push(variable_dummy)
  }

  for(let i = 0; i < n - 3; i++) {
    res_temp.push(normal_dummy)
  }

  const res:Array<Array<IAnnouncement_summary>> = []
  let temp:Array<IAnnouncement_summary> = []
  for(let i = 0; i < n; i++) {
    if(i % 15 === 0 && i !== 0) {
      res.push(temp)
      temp = []
    }
    temp.push(res_temp[i])
  }

  return res;
}

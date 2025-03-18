import {INotification_data} from "@/shared/type";

export default async function get_notification(): Promise<Array<INotification_data>> {
	const dummy: INotification_data = {
		id: 'notification_id',
		title: '(필독)대출직거래시 주의사항 및 예방안내',
		views: 1000,
	}
	const res: Array<INotification_data> = [];
	for(let i = 0; i < 3; i++) res.push(dummy)

	return res;
}
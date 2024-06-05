import style from "@/styles/rooms.module.scss";
import Image from "next/image";
import edit from "../../public/edit.svg";
import {useState} from "react";
import onUpdate from "@/lib/hooks/submit";


const RoomInput = ({Comments, id}) => {
	const [comment, setComment] = useState(Comments);

	return (
		<>
			<label className={style.rooms__item_inner}>
				<textarea className={style.rooms__item_comments} value={comment ? comment : ''} onChange={(e) => setComment(e.target.value)}/>
			</label>
			<div className={style.rooms__item_img} onClick={() => onUpdate(comment, 'rooms', id)}>
				<Image src={edit} alt="edit" />
			</div>
		</>
	)
};

export default RoomInput;
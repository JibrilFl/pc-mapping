"use client"

import style from "@/styles/computers-room.module.scss";
import {useState} from "react";
import Image from "next/image";
import edit from "../../public/edit.svg";
import onUpdate from "@/lib/hooks/submit";

const Input = ({text, id}) => {
	const [comment, setComment] = useState(String(text));

	return (
		<>
			<label className={style.room__computers_label}>
				<textarea className={style.room__computers_input} value={comment ? comment : ''} onChange={(e) => setComment(e.target.value)} />
			</label>
			<div className={style.room__computers_edit} onClick={() => onUpdate(comment, 'computers', id)}>
				<Image src={edit} alt="edit" />
			</div>
		</>
	)
};

export default Input;